import Link from "next/link";
import { Eye, MapPin, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { formatRelativeTime, getClients } from "@/lib/admin-db";
import styles from "../admin.module.css";

export default async function AdminClientsPage() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const clients = getClients();
  const locatedClients = clients.filter(
    (client) => client.latitude !== undefined && client.longitude !== undefined,
  );

  return (
    <main className={styles.content}>
      <section className={styles.sectionHeader}>
        <div>
          <span>Clients</span>
          <h1>Client Activity</h1>
          <p>Track visitor UUIDs, last activity, and page engagement.</p>
        </div>
        <Link className={styles.mapButton} href="/admin/clients/map">
          <MapPin size={15} /> View all locations
        </Link>
      </section>

      {clients.length === 0 ? (
        <section className={styles.emptyCard}>
          <div>
            <span>
              <Users size={16} /> No clients
            </span>
            <h2>No data is available now</h2>
            <p>Client rows will appear after visitors load pages on the website.</p>
          </div>
        </section>
      ) : (
        <section className={styles.tableCard} aria-label="Client activity table">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#Sr</th>
                <th>UUID</th>
                <th>Location</th>
                <th>Map</th>
                <th>IP</th>
                <th>Last Activity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client.uuid}>
                  <td>{index + 1}</td>
                  <td className={styles.uuidCell}>{client.uuid}</td>
                  <td>
                    {[client.city, client.country].filter(Boolean).join(", ") ||
                      "Unavailable"}
                  </td>
                  <td>
                    {client.latitude !== undefined && client.longitude !== undefined ? (
                      <Link
                        className={styles.locationIconButton}
                        href="/admin/clients/map"
                        aria-label={`View ${client.uuid} on users map`}
                        title={client.uuid}
                      >
                        <MapPin size={16} />
                      </Link>
                    ) : (
                      "Unavailable"
                    )}
                  </td>
                  <td>{client.ip || "Unavailable"}</td>
                  <td>{formatRelativeTime(client.lastActivity)}</td>
                  <td>
                    <Link
                      className={styles.viewButton}
                      href={`/admin/client/view?uuid=${encodeURIComponent(client.uuid)}`}
                    >
                      <Eye size={15} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {clients.length > 0 && locatedClients.length === 0 ? (
        <p className={styles.locationHint}>
          No map locations are available yet. User latitude and longitude will appear
          after the location API returns data.
        </p>
      ) : null}
    </main>
  );
}
