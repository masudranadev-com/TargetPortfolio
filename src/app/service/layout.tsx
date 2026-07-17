import styles from "./service.module.css";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.shell}>{children}</main>;
}
