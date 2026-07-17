import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { serviceDetails } from "../service-data";
import { ServiceDetailVisual } from "./ServiceDetailVisual";
import homeStyles from "../../page.module.css";
import styles from "./service-detail.module.css";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service not found | MR InfinityX",
    };
  }

  return {
    title: `${service.title} | MR InfinityX Services`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className={styles.detailHero} aria-labelledby="service-detail-title">
        <div className={styles.container}>
          <Link className={styles.backLink} href="/service">
            <ArrowLeft size={16} /> All services
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span>{service.eyebrow}</span>
              <h1 id="service-detail-title">{service.title}</h1>
              <p>{service.summary}</p>
              <div className={styles.metricPill}>
                <Sparkles size={16} />
                <strong>{service.metric}</strong>
              </div>
            </div>

            <ServiceAnimationCard service={service} />
          </div>
        </div>
      </section>

      <section className={styles.processSection} aria-label={`${service.title} process`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span>Service process</span>
            <h2>How we develop this service for your Target product page</h2>
          </div>
          <div className={styles.processGrid}>
            {service.process.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.outcomeSection} aria-label={`${service.title} outcomes`}>
        <div className={styles.container}>
          <div className={styles.outcomePanel}>
            <div>
              <span>What this improves</span>
              <h2>{service.visualTitle}</h2>
              <p>
                This service turns scattered product-page issues into a focused
                improvement plan your team can publish, test, and refresh.
              </p>
            </div>
            <ul>
              {service.outcomes.map((outcome) => (
                <li key={outcome}>
                  <CheckCircle2 size={16} />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.nextSection} aria-label="Next service navigation">
        <div className={styles.container}>
          <div className={styles.nextBand}>
            <div>
              <span>Need the full system?</span>
              <h2>Combine this with SEO, reviews, Q&A, and content management.</h2>
            </div>
            <Link href="/service">
              View all services <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceAnimationCard({
  service,
}: {
  service: (typeof serviceDetails)[number];
}) {
  return (
    <div className={styles.detailWorkflow}>
      <div className={homeStyles.caseGrid} aria-label={`${service.title} workflow preview`}>
        <article className={styles.serviceVisualBox}>
          <ServiceDetailVisual slug={service.slug} />
        </article>

        <article className={homeStyles.caseCard}>
          <div className={homeStyles.slideMeta}>
            <span className={homeStyles.activeTab}>
              <Sparkles size={20} /> {service.eyebrow}
            </span>
            <span>Service view</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <ul className={homeStyles.slideList}>
            {service.process.slice(0, 3).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className={homeStyles.slideStats}>
            {service.outcomes.map((outcome) => (
              <span key={outcome}>{outcome}</span>
            ))}
          </div>
          <Link href="/service">
            Explore all services <ArrowRight size={17} />
          </Link>
        </article>
      </div>
    </div>
  );
}
