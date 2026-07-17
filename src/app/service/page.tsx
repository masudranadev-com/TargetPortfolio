import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Eye,
  Gem,
  KeyRound,
  MessageCircle,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tags,
} from "lucide-react";
import styles from "./service.module.css";

export const metadata: Metadata = {
  title: "Services | MR InfinityX Target Marketplace",
  description:
    "Target marketplace ratings, reviews, SEO, keyword research, content management, and customer Q&A services from MR InfinityX.",
};

const services = [
  {
    slug: "ratings",
    title: "Ratings",
    eyebrow: "Trust signal growth",
    icon: Star,
    summary:
      "Improve the rating signals shoppers notice first by turning product quality feedback into clearer listing actions.",
    outcomes: ["Rating health review", "Low-star issue themes", "Trust-building recommendations"],
    metric: "Rating gaps",
  },
  {
    slug: "reviews",
    title: "Reviews",
    eyebrow: "Shopper voice analysis",
    icon: MessageCircle,
    summary:
      "Convert customer review language into listing improvements, Q&A topics, image priorities, and stronger buyer confidence.",
    outcomes: ["Review theme mapping", "Positive and negative sentiment", "Response guidance"],
    metric: "Buyer concerns",
  },
  {
    slug: "product-seo",
    title: "Product SEO",
    eyebrow: "Search visibility",
    icon: Tags,
    summary:
      "Optimize titles, bullets, descriptions, and attributes so Target shoppers and marketplace search understand the product faster.",
    outcomes: ["Title optimization", "Attribute completeness", "Competitor content comparison"],
    metric: "Content score",
  },
  {
    slug: "keyword-research",
    title: "Keyword Research",
    eyebrow: "Intent planning",
    icon: KeyRound,
    summary:
      "Build keyword maps around buyer intent, seasonal demand, product use cases, and conversion-ready content placement.",
    outcomes: ["Primary keyword groups", "Seasonal search terms", "Keyword-to-content plan"],
    metric: "Intent map",
  },
  {
    slug: "content-management",
    title: "Content Management",
    eyebrow: "Assets and copy",
    icon: PenTool,
    summary:
      "Organize listing materials across images, video direction, titles, descriptions, bullets, and ongoing content refreshes.",
    outcomes: ["Image and video planning", "Benefit-led bullets", "Launch-ready copy updates"],
    metric: "Copy updates",
  },
  {
    slug: "customer-qa-post",
    title: "Customer Q/A Post",
    eyebrow: "Objection handling",
    icon: ClipboardList,
    summary:
      "Create useful customer questions and answers that remove uncertainty before checkout and support shopper confidence.",
    outcomes: ["Buyer question research", "Helpful answer writing", "Product-page Q&A posts"],
    metric: "Answer quality",
  },
];

const processSteps = [
  "Audit the existing Target product page and marketplace category context.",
  "Extract buyer concerns from ratings, reviews, Q&A gaps, and search intent.",
  "Create the content plan: keywords, title, bullets, images, video brief, and Q&A.",
  "Deliver prioritized updates your team can publish, review, and keep improving.",
];

const deliverables = [
  "Target-ready product title and bullet direction",
  "Review insights and customer objection map",
  "Keyword groups by search intent and seasonality",
  "Image, video, and content management checklist",
  "Customer Q&A posts for AirPods-style product concerns",
  "Ongoing refresh recommendations for stronger conversion",
];

export default function ServicePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="service-title">
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <span>Target marketplace service system</span>
            <h1 id="service-title">Services that make Target listings easier to trust, find, and buy</h1>
            <p>
              MR InfinityX helps sellers improve product pages with ratings strategy,
              review intelligence, SEO, keyword research, content management, and
              customer Q&A built around real shopper decisions.
            </p>
            <div className={styles.heroProofGrid} aria-label="Service proof points">
              <span><strong>6</strong> focused services</span>
              <span><strong>5s</strong> visual workflows</span>
              <span><strong>24/7</strong> content support</span>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="Service performance overview">
            <div className={styles.panelTopline}>
              <span><Gem size={16} /> Marketplace operating system</span>
              <em>Live plan</em>
            </div>
            <div className={styles.scoreHeader}>
              <span>Listing readiness</span>
              <strong>92%</strong>
            </div>
            <div className={styles.scoreBars}>
              <span style={{ "--bar-width": "88%" } as CSSProperties} />
              <span style={{ "--bar-width": "74%" } as CSSProperties} />
              <span style={{ "--bar-width": "96%" } as CSSProperties} />
            </div>
            <div className={styles.signalGrid}>
              <span><Star size={16} /> Ratings</span>
              <span><Search size={16} /> Keywords</span>
              <span><PenTool size={16} /> Copy</span>
              <span><ShieldCheck size={16} /> Q&A</span>
            </div>
            <div className={styles.panelFooter}>
              <span>Next action</span>
              <strong>Refresh product title, review answers, and image sequence</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection} id="services" aria-label="Services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span>Core services</span>
            <h2>Everything your Target product page needs to perform</h2>
          </div>

          <div className={styles.serviceGrid}>
            {services.map(({ slug, title, eyebrow, icon: Icon, summary, outcomes, metric }) => (
              <Link
                className={styles.serviceCard}
                href={`/service/${slug}`}
                key={title}
                aria-label={`Open ${title} service page`}
              >
                <div className={styles.serviceTop}>
                  <span><Icon size={22} /></span>
                  <span className={styles.serviceViewLink} aria-hidden="true">
                    <Eye size={17} />
                  </span>
                </div>
                <em className={styles.serviceEyebrow}>{eyebrow}</em>
                <h3>{title}</h3>
                <p>{summary}</p>
                <ul>
                  {outcomes.map((outcome) => (
                    <li key={outcome}><CheckCircle2 size={15} />{outcome}</li>
                ))}
                </ul>
                <strong>{metric}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflowSection} aria-label="Service workflow">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span>How it works</span>
            <h2>A focused workflow from audit to publish-ready improvements</h2>
          </div>
          <div className={styles.workflowList}>
            {processSteps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.deliverablesSection} aria-label="Deliverables">
        <div className={styles.container}>
          <div className={styles.deliverablesPanel}>
            <div>
              <span>What you receive</span>
              <h2>Clear recommendations your team can act on</h2>
              <p>
                Each service is designed to leave you with practical listing updates,
                not vague suggestions. The goal is a product page that answers faster,
                ranks better, and feels more complete to shoppers.
              </p>
            </div>
            <ul>
              {deliverables.map((item) => (
                <li key={item}><CheckCircle2 size={16} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-label="Start service work">
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <span><Sparkles size={18} /> Target-ready content support</span>
              <h2>Ready to improve your product page?</h2>
            </div>
            <Link href="/">Back to homepage <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
