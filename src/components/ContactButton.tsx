"use client";

import { Mail, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "../app/page.module.css";

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

export function ContactButton({
  className,
  children = "Get Started",
}: {
  className: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

      {isOpen ? (
        <div
          className={styles.contactOverlay}
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <div
            className={styles.contactModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className={styles.contactClose}
              type="button"
              aria-label="Close contact popup"
              onClick={() => setIsOpen(false)}
            >
              <X size={19} />
            </button>

            <span className={styles.contactEyebrow}>Start your project</span>
            <h2 id="contact-modal-title">Contact MR InfinityX</h2>
            <p>
              Choose your preferred app and it will open directly with our
              account details.
            </p>

            <div className={styles.contactList}>
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  href={href}
                  key={label}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer"}
                  onClick={() => setIsOpen(false)}
                >
                  <span>
                    <Icon size={20} />
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
      ) : null}
    </>
  );
}
