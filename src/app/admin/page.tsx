import { LayoutDashboard } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAdmin } from "./actions";
import styles from "./admin.module.css";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const isAuthenticated = await isAdminAuthenticated();
  const { error } = await searchParams;

  if (!isAuthenticated) {
    return (
      <main className={styles.loginShell}>
        <section className={styles.loginCard} aria-labelledby="admin-login-title">
          <span>
            <LayoutDashboard size={16} /> Admin login
          </span>
          <h1 id="admin-login-title">Welcome back</h1>
          <p>Login to view your admin dashboard and client activity.</p>

          <form className={styles.loginForm} action={loginAdmin}>
            {error ? <div className={styles.loginError}>Invalid username or password.</div> : null}
            <label>
              Username
              <input name="username" type="text" autoComplete="username" />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.content}>
      <section className={styles.sectionHeader}>
        <div>
          <span>Dashboard</span>
          <h1>Overview</h1>
          <p>Your admin dashboard is ready for client activity data.</p>
        </div>
      </section>

      <section className={styles.emptyCard}>
        <div>
          <span>No records</span>
          <h2>No data is available now</h2>
          <p>Client activity will appear here after visitors browse the website.</p>
        </div>
      </section>
    </main>
  );
}
