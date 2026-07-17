import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { formatRelativeTime, getClients } from "@/lib/admin-db";
import styles from "../../admin.module.css";

function toMarkerPosition(latitude: number, longitude: number) {
  return {
    left: `${Math.min(Math.max(((longitude + 180) / 360) * 100, 2), 98)}%`,
    top: `${Math.min(Math.max(((90 - latitude) / 180) * 100, 4), 96)}%`,
  };
}

function createGoogleMapsHref(
  clients: Array<{ latitude?: number; longitude?: number }>,
) {
  const coordinates = clients
    .filter((client) => client.latitude !== undefined && client.longitude !== undefined)
    .slice(0, 10)
    .map((client) => `${client.latitude},${client.longitude}`);

  if (coordinates.length === 0) {
    return "https://www.google.com/maps";
  }

  if (coordinates.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates[0]}`;
  }

  return `https://www.google.com/maps/dir/${coordinates.join("/")}`;
}

export default async function AdminClientsMapPage() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const clients = getClients();
  const locatedClients = clients.filter(
    (client) => client.latitude !== undefined && client.longitude !== undefined,
  );
  const googleMapsHref = createGoogleMapsHref(locatedClients);

  return (
    <main className={styles.content}>
      <section className={styles.sectionHeader}>
        <div>
          <span>Users map</span>
          <h1>All User Locations</h1>
          <p>Hover any marker to view the user UUID and last activity.</p>
        </div>
        <div className={styles.headerButtonGroup}>
          <Link className={styles.mapButton} href="/admin/clients">
            <ArrowLeft size={15} /> Back to clients
          </Link>
          <a
            className={styles.mapButton}
            href={googleMapsHref}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} /> Open Google Maps <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {locatedClients.length === 0 ? (
        <section className={styles.emptyCard}>
          <div>
            <span>
              <MapPin size={16} /> No locations
            </span>
            <h2>No data is available now</h2>
            <p>Locations will appear after visitors are tracked with latitude and longitude.</p>
          </div>
        </section>
      ) : (
        <section className={styles.userMapCard} aria-label="All user locations map">
          <div className={styles.userMapCanvas}>
            <div className={styles.mapGrid} aria-hidden="true" />
            {locatedClients.map((client) => {
              const latitude = Number(client.latitude);
              const longitude = Number(client.longitude);

              return (
                <a
                  className={styles.userMapMarker}
                  href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                  key={client.uuid}
                  style={toMarkerPosition(latitude, longitude)}
                  target="_blank"
                  rel="noreferrer"
                  title={client.uuid}
                  aria-label={`Open ${client.uuid} in Google Maps`}
                >
                  <MapPin size={18} />
                  <span>
                    <strong>{client.uuid}</strong>
                    <small>
                      {[client.city, client.country].filter(Boolean).join(", ") ||
                        `${latitude}, ${longitude}`}
                    </small>
                    <em>{formatRelativeTime(client.lastActivity)}</em>
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
