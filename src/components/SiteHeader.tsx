"use client";

import Link from "next/link";
import { Box, MoreVertical } from "lucide-react";
import { useState } from "react";
import styles from "../app/page.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Process", href: "/#process" },
  { label: "Testimonials", href: "/#testimonials" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className={styles.headerSection} data-site-chrome aria-label="Site navigation">
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="MR InfinityX home">
            <span className={styles.logoMark}>
              <Box size={22} strokeWidth={3} />
            </span>
            <span>MR InfinityX</span>
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className={styles.mobileMenuButton}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MoreVertical size={22} />
          </button>

          <div
            className={`${styles.mobileMenu} ${
              isMenuOpen ? styles.mobileMenuOpen : ""
            }`}
            id="mobile-menu"
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      </div>
    </section>
  );
}
