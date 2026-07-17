import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export type AdminClient = {
  uuid: string;
  firstSeen: number;
  lastActivity: number;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  language?: string;
  screen?: string;
  userAgent?: string;
  locationUpdatedAt?: number;
};

export type ClientEvent = {
  id: number;
  uuid: string;
  pagePath: string;
  pageTitle: string;
  area: string;
  eventType: string;
  occurredAt: number;
  durationMs: number;
};

export type PageTimeSummary = {
  uuid: string;
  pagePath: string;
  pageTitle: string;
  totalMs: number;
  visits: number;
  lastActivity: number;
};

type AdminDatabase = {
  nextEventId: number;
  clients: AdminClient[];
  events: ClientEvent[];
  pageTimes: PageTimeSummary[];
};

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "admin-lightdb.json");

function createEmptyDatabase(): AdminDatabase {
  return {
    nextEventId: 1,
    clients: [],
    events: [],
    pageTimes: [],
  };
}

function ensureDataDirectory() {
  if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory, { recursive: true });
  }
}

function readDatabase(): AdminDatabase {
  ensureDataDirectory();

  if (!existsSync(databasePath)) {
    const emptyDatabase = createEmptyDatabase();
    writeDatabase(emptyDatabase);
    return emptyDatabase;
  }

  try {
    const parsed = JSON.parse(readFileSync(databasePath, "utf8")) as Partial<AdminDatabase>;
    return {
      nextEventId: Number(parsed.nextEventId || 1),
      clients: Array.isArray(parsed.clients) ? parsed.clients : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
      pageTimes: Array.isArray(parsed.pageTimes) ? parsed.pageTimes : [],
    };
  } catch {
    const emptyDatabase = createEmptyDatabase();
    writeDatabase(emptyDatabase);
    return emptyDatabase;
  }
}

function writeDatabase(database: AdminDatabase) {
  ensureDataDirectory();
  writeFileSync(databasePath, JSON.stringify(database, null, 2));
}

export function recordClientActivity({
  uuid,
  pagePath,
  pageTitle,
  area,
  eventType,
  durationMs,
  clientInfo,
  occurredAt = Date.now(),
}: {
  uuid: string;
  pagePath: string;
  pageTitle: string;
  area: string;
  eventType: string;
  durationMs: number;
  clientInfo?: Partial<
    Pick<
      AdminClient,
      | "ip"
      | "city"
      | "region"
      | "country"
      | "latitude"
      | "longitude"
      | "timezone"
      | "language"
      | "screen"
      | "userAgent"
      | "locationUpdatedAt"
    >
  >;
  occurredAt?: number;
}) {
  const database = readDatabase();
  const cleanDuration = Math.max(0, Math.round(durationMs));
  const existingClient = database.clients.find((client) => client.uuid === uuid);

  if (existingClient) {
    existingClient.lastActivity = occurredAt;
    Object.assign(existingClient, removeEmptyClientInfo(clientInfo));
  } else {
    database.clients.push({
      uuid,
      firstSeen: occurredAt,
      lastActivity: occurredAt,
      ...removeEmptyClientInfo(clientInfo),
    });
  }

  database.events.push({
    id: database.nextEventId,
    uuid,
    pagePath,
    pageTitle,
    area,
    eventType,
    occurredAt,
    durationMs: cleanDuration,
  });
  database.nextEventId += 1;

  if (database.events.length > 5000) {
    database.events = database.events
      .sort((a, b) => b.occurredAt - a.occurredAt)
      .slice(0, 5000);
  }

  if (cleanDuration > 0) {
    const existingPageTime = database.pageTimes.find(
      (page) => page.uuid === uuid && page.pagePath === pagePath,
    );

    if (existingPageTime) {
      existingPageTime.pageTitle = pageTitle;
      existingPageTime.totalMs += cleanDuration;
      existingPageTime.visits += 1;
      existingPageTime.lastActivity = occurredAt;
    } else {
      database.pageTimes.push({
        uuid,
        pagePath,
        pageTitle,
        totalMs: cleanDuration,
        visits: 1,
        lastActivity: occurredAt,
      });
    }
  }

  writeDatabase(database);
}

function removeEmptyClientInfo(clientInfo?: Partial<AdminClient>) {
  if (!clientInfo) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(clientInfo).filter(([, value]) => value !== undefined && value !== ""),
  ) as Partial<AdminClient>;
}

export function getClients() {
  return readDatabase().clients
    .toSorted((a, b) => b.lastActivity - a.lastActivity)
    .slice(0, 200);
}

export function getClient(uuid: string) {
  return readDatabase().clients.find((client) => client.uuid === uuid) || null;
}

export function getClientEvents(uuid: string) {
  return readDatabase().events
    .filter((event) => event.uuid === uuid)
    .toSorted((a, b) => b.occurredAt - a.occurredAt)
    .slice(0, 200);
}

export function getClientPageTimes(uuid: string) {
  return readDatabase().pageTimes
    .filter((page) => page.uuid === uuid)
    .toSorted((a, b) => b.totalMs - a.totalMs);
}

export function formatRelativeTime(timestamp: number) {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (elapsedSeconds < 60) {
    return `${Math.max(1, elapsedSeconds)}s ago`;
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${remainingMinutes}m ${hours}h ago`
      : `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return remainingHours > 0 ? `${remainingHours}h ${days}d ago` : `${days}d ago`;
}

export function formatDuration(durationMs: number) {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}
