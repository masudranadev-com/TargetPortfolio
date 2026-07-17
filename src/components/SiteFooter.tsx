import Link from "next/link";
import { Mail, MessageCircle, Send } from "lucide-react";
import styles from "../app/page.module.css";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Process", href: "/#process" },
      { label: "Platforms", href: "/#platforms" },
      { label: "Contact", href: "/#testimonials" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Ratings", href: "/service/ratings" },
      { label: "Reviews", href: "/service/reviews" },
      { label: "Product SEO", href: "/service/product-seo" },
      { label: "Content", href: "/service/content-management" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Target Platform", href: "/" },
      { label: "Amazon", href: "/#platforms" },
      { label: "Walmart", href: "/#platforms" },
      { label: "eBay", href: "/#platforms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "SEO Audit", href: "/service/product-seo" },
      { label: "Keyword Plan", href: "/service/keyword-research" },
      { label: "Content Brief", href: "/service/content-management" },
      { label: "Terms & Conditions", href: "/terms-condition" },
    ],
  },
];

const contactLinks = [
  {
    label: "WeChat",
    value: "mrinfinity_net",
    href: "weixin://dl/chat?mrinfinity_net",
    icon: MessageCircle,
  },
  {
    label: "WhatsApp",
    value: "+8801934338246",
    href: "https://wa.me/8801934338246",
    icon: MessageCircle,
  },
  {
    label: "Telegram",
    value: "@mrinfinity_net",
    href: "https://t.me/mrinfinity_net",
    icon: Send,
  },
  {
    label: "Email",
    value: "mrinfinity.service@gmail.com",
    href: "mailto:mrinfinity.service@gmail.com?subject=Target%20Marketplace%20Service%20Inquiry",
    icon: Mail,
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-site-chrome>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {footerColumns.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}

          <div className={styles.footerContact}>
            <h3>Contact MR InfinityX</h3>
            <div className={styles.footerContactList}>
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  href={href}
                  key={label}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer"}
                >
                  <span>
                    <Icon size={15} />
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <small>{value}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>(c) 2026 MR InfinityX. Independent marketplace services.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className={styles.footerColumn}>
      <h3>{title}</h3>
      {links.map((link) => (
        <Link href={link.href} key={link.label}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
