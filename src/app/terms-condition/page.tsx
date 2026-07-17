import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./terms.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | MR InfinityX",
  description:
    "Terms and conditions for MR InfinityX Target marketplace listing optimization services.",
};

const termsSections = [
  {
    title: "Service Scope",
    copy:
      "MR InfinityX provides marketplace listing support for Target product pages, including ratings analysis, review insights, product SEO, keyword research, content management, and customer Q&A planning.",
  },
  {
    title: "Client Responsibilities",
    copy:
      "Clients are responsible for providing accurate product information, brand guidelines, marketplace access details when required, and approval for any content before it is published.",
  },
  {
    title: "Marketplace Compliance",
    copy:
      "All recommendations are intended to support honest, shopper-friendly listings. Clients must follow Target marketplace policies, advertising rules, review policies, and applicable laws.",
  },
  {
    title: "Deliverables",
    copy:
      "Deliverables may include audits, keyword maps, title and bullet recommendations, review theme summaries, image or video direction, content refresh plans, and customer Q&A suggestions.",
  },
  {
    title: "Results & Guarantees",
    copy:
      "MR InfinityX does not guarantee specific rankings, ratings, reviews, sales volume, approval outcomes, or marketplace placement. Results depend on product quality, competition, demand, pricing, fulfillment, and platform behavior.",
  },
  {
    title: "Revisions",
    copy:
      "Reasonable revisions are included when they relate to the agreed service scope. New product categories, additional SKUs, or major direction changes may require a separate scope or fee.",
  },
  {
    title: "Payments",
    copy:
      "Project pricing, payment schedule, and delivery timelines are agreed before work begins. Work may pause if required information, approvals, or payments are delayed.",
  },
  {
    title: "Content Use",
    copy:
      "Clients may use approved deliverables for their own product listings and marketplace operations. MR InfinityX may reference non-confidential project learnings unless a separate confidentiality agreement applies.",
  },
];

const serviceTerms = [
  "Ratings work focuses on analysis and recommendations, not artificial rating manipulation.",
  "Review services use shopper feedback to improve clarity, trust, and content decisions.",
  "SEO and keyword research are strategic recommendations, not guaranteed search placement.",
  "Content management depends on accurate product claims, approved assets, and platform rules.",
  "Customer Q&A suggestions should answer real buyer concerns clearly and truthfully.",
];

export default function TermsConditionPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <span>
              <FileText size={17} /> Service agreement
            </span>
            <h1 id="terms-title">Terms & Conditions</h1>
            <p>
              These terms explain how MR InfinityX provides Target marketplace
              listing optimization services, what clients need to provide, and
              how deliverables should be used.
            </p>
          </div>

          <div className={styles.heroPanel}>
            <span>
              <ShieldCheck size={18} /> Built for honest marketplace growth
            </span>
            <strong>Service-first terms for Target product page work</strong>
            <p>
              Ratings, reviews, SEO, keyword research, content management, and
              Q&A support are handled as practical recommendations for better
              product-page clarity and buyer confidence.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.termsSection} aria-label="Terms sections">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span>Agreement details</span>
            <h2>Terms for using MR InfinityX services</h2>
          </div>

          <div className={styles.termsGrid}>
            {termsSections.map((section, index) => (
              <article className={styles.termCard} key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.serviceRulesSection} aria-label="Service-specific terms">
        <div className={styles.container}>
          <div className={styles.rulesPanel}>
            <div>
              <span>
                <Sparkles size={18} /> Service-specific notes
              </span>
              <h2>How these terms apply to our core services</h2>
              <p>
                Our work is designed to improve listing quality, shopper
                understanding, and marketplace readiness through ethical,
                policy-aware recommendations.
              </p>
            </div>

            <ul>
              {serviceTerms.map((term) => (
                <li key={term}>
                  <CheckCircle2 size={16} />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-label="Service navigation">
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <span>Need service details?</span>
              <h2>Review the services covered by these terms.</h2>
            </div>
            <Link href="/service">
              View services <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
