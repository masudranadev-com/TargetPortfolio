import type { Metadata } from "next";
import Link from "next/link";
import { Box, LayoutDashboard, Search, Settings, Users, User } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdmin } from "./actions";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin | MR InfinityX",
  description: "MR InfinityX admin panel.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await isAdminAuthenticated();

  return (
    <div className={styles.hidePublicChrome} data-admin-area>
      {isAuthenticated ? (
        <section className={styles.adminShell}>
          <aside className={styles.sidebar} aria-label="Admin sidebar">
            <Link className={styles.brand} href="/admin">
              <span>
                <Box size={20} strokeWidth={3} />
              </span>
              <strong>MR Admin</strong>
            </Link>

            <nav className={styles.menu} aria-label="Admin navigation">
              <Link href="/admin">
                <LayoutDashboard size={19} />
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/clients">
                <Users size={19} />
                <span>Clients</span>
              </Link>
            </nav>
          </aside>

          <div className={styles.adminMain}>
            <header className={styles.adminHeader}>
              <div className={styles.searchBox}>
                <Search size={18} />
                <input type="search" placeholder="Search clients, UUID, pages..." />
              </div>

              <div className={styles.headerActions}>
                <button className={styles.iconButton} type="button" aria-label="Settings">
                  <Settings size={19} />
                </button>
                <button className={styles.profileButton} type="button" aria-label="Admin profile">
                  <User size={19} />
                </button>
                <form action={logoutAdmin}>
                  <button className={styles.logoutButton} type="submit">
                    Logout
                  </button>
                </form>
              </div>
            </header>

            {children}
          </div>
        </section>
      ) : (
        children
      )}
    </div>
  );
}
