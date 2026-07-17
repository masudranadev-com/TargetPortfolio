import { recordClientActivity } from "@/lib/admin-db";

export const runtime = "nodejs";

type IpLocation = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "";

  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127.")) {
    return "";
  }

  return ip;
}

async function lookupIpLocation(ip: string): Promise<IpLocation> {
  if (!ip) {
    return {};
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1400);
    const response = await fetch(`http://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return { ip };
    }

    const data = (await response.json()) as {
      success?: boolean;
      ip?: string;
      city?: string;
      region?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
      timezone?: { id?: string };
    };

    if (data.success === false) {
      return { ip };
    }

    return {
      ip: data.ip || ip,
      city: data.city,
      region: data.region,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone?.id,
    };
  } catch {
    return { ip };
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      uuid?: string;
      pagePath?: string;
      pageTitle?: string;
      area?: string;
      eventType?: string;
      durationMs?: number;
      occurredAt?: number;
      language?: string;
      timezone?: string;
      screen?: string;
      browserLocation?: IpLocation;
    };

    if (!payload.uuid || !payload.pagePath) {
      return Response.json({ ok: false }, { status: 400 });
    }

    const browserLocation = payload.browserLocation || {};
    const ip = getRequestIp(request) || browserLocation.ip || "";
    const ipLocation =
      browserLocation.ip || browserLocation.city || browserLocation.country
        ? browserLocation
        : await lookupIpLocation(ip);
    const occurredAt = Number(payload.occurredAt || Date.now());

    recordClientActivity({
      uuid: payload.uuid.slice(0, 80),
      pagePath: payload.pagePath.slice(0, 220),
      pageTitle: (payload.pageTitle || "Untitled page").slice(0, 180),
      area: (payload.area || "Page").slice(0, 180),
      eventType: (payload.eventType || "Page loaded").slice(0, 80),
      durationMs: Number(payload.durationMs || 0),
      occurredAt,
      clientInfo: {
        ...ipLocation,
        timezone: payload.timezone || ipLocation.timezone,
        language: payload.language?.slice(0, 60),
        screen: payload.screen?.slice(0, 40),
        userAgent: request.headers.get("user-agent")?.slice(0, 260),
        locationUpdatedAt: occurredAt,
      },
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
