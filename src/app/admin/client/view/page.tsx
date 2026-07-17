import { ExternalLink, MapPin } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  formatDuration,
  formatRelativeTime,
  getClient,
  getClientEvents,
  getClientPageTimes,
} from "@/lib/admin-db";
import styles from "../../admin.module.css";

export default async function AdminClientViewPage({
  searchParams,
}: {
  searchParams: Promise<{ uuid?: string }>;
}) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const { uuid } = await searchParams;
  const client = uuid ? getClient(uuid) : null;
  const events = client ? getClientEvents(client.uuid) : [];
  const pageTimes = client ? getClientPageTimes(client.uuid) : [];
  const mapHref =
    client?.latitude !== undefined && client?.longitude !== undefined
      ? `https://www.google.com/maps/search/?api=1&query=${client.latitude},${client.longitude}`
      : "";

  return (
    <main className={styles.content}>
      <section className={styles.sectionHeader}>
        <div>
          <span>Client view</span>
          <h1>Client Details</h1>
          <p>General info, last activity, event history, and page time summary.</p>
        </div>
      </section>

      {!client ? (
        <section className={styles.emptyCard}>
          <div>
            <span>No client</span>
            <h2>No data is available now</h2>
            <p>Select a client from the clients table to view detailed activity.</p>
          </div>
        </section>
      ) : (
        <>
          <section className={styles.infoGrid} aria-label="Client general info">
            <article className={styles.infoCard}>
              <p>UUID</p>
              <strong>{client.uuid}</strong>
            </article>
            <article className={styles.infoCard}>
              <p>Last Activity</p>
              <strong>{formatRelativeTime(client.lastActivity)}</strong>
            </article>
            <article className={styles.infoCard}>
              <p>First Seen</p>
              <strong>{formatRelativeTime(client.firstSeen)}</strong>
            </article>
            <article className={styles.infoCard}>
              <p>Location</p>
              <strong>
                {[client.city, client.region, client.country].filter(Boolean).join(", ") ||
                  "Location unavailable"}
              </strong>
              {mapHref ? (
                <a
                  className={styles.mapButton}
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View user location on map"
                >
                  <MapPin size={15} /> View map <ExternalLink size={13} />
                </a>
              ) : null}
            </article>
            <article className={styles.infoCard}>
              <p>IP Address</p>
              <strong>{client.ip || "IP unavailable"}</strong>
            </article>
            <article className={styles.infoCard}>
              <p>Timezone / Language</p>
              <strong>{client.timezone || "Timezone unavailable"}</strong>
              <span>{client.language || "Language unavailable"}</span>
            </article>
            <article className={styles.infoCard}>
              <p>Device Info</p>
              <strong>{client.screen || "Screen unavailable"}</strong>
              <span>{client.userAgent || "User agent unavailable"}</span>
            </article>
          </section>

          <section className={styles.pageCards} aria-label="Page time summary">
            {pageTimes.length === 0 ? (
              <article className={styles.pageTimeCard}>
                <span>No page time</span>
                <h3>No data is available now</h3>
                <strong>0s</strong>
                <p>Waiting for page sessions.</p>
              </article>
            ) : (
              pageTimes.map((page) => (
                <article className={styles.pageTimeCard} key={page.pagePath}>
                  <span>{page.visits} visits</span>
                  <h3>{page.pageTitle || page.pagePath}</h3>
                  <strong>{formatDuration(page.totalMs)}</strong>
                  <p>{page.pagePath}</p>
                </article>
              ))
            )}
          </section>

          <section className={styles.tableCard} aria-label="Client event table">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#Sr</th>
                  <th>Clicking Page / Area / Loaded Page</th>
                  <th>Time</th>
                  <th>Time Spend</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No data is available now</td>
                  </tr>
                ) : (
                  events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{event.eventType}</strong>
                        <br />
                        {event.pageTitle} / {event.area}
                      </td>
                      <td>{formatRelativeTime(event.occurredAt)}</td>
                      <td>{formatDuration(event.durationMs)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </>
      )}
    </main>
  );
}
