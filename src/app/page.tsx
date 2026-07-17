"use client";

import Image from "next/image";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  KeyRound,
  Mail,
  MessageCircle,
  MoreVertical,
  PenTool,
  Quote,
  ShoppingBag,
  Star,
  Tags,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import styles from "./page.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Testimonials", href: "/#testimonials" },
];

const platforms = [
  {
    name: "Amazon",
    slug: "amazon",
    label: "Marketplace SEO & listing content",
  },
  {
    name: "Walmart",
    slug: "walmart",
    label: "Catalog optimization & item setup",
  },
  {
    name: "eBay",
    slug: "ebay",
    label: "Search titles, images & conversion copy",
  },
  {
    name: "Chewy",
    slug: "chewy",
    label: "Pet product content & brand pages",
  },
];

const services = [
  {
    title: "Ratings",
    copy: "Improve trust signals, feedback flow, and product quality insights",
    icon: Star,
  },
  {
    title: "Reviews",
    copy: "Review monitoring, response guidance, and conversion learnings",
    icon: MessageCircle,
  },
  {
    title: "Product SEO",
    copy: "Optimize Target titles, bullets, descriptions, and attributes",
    icon: Tags,
  },
  {
    title: "Keyword Analysis",
    copy: "Map buyer search intent to product categories and seasonal demand",
    icon: KeyRound,
  },
  {
    title: "Content Management",
    copy: "Create images, video, titles, descriptions, and rich product copy",
    icon: PenTool,
  },
  {
    title: "Customer Q/A Post",
    copy: "Create helpful Q&A posts that answer shopper concerns and improve confidence",
    icon: ClipboardList,
  },
];

const bottomStats = [
  {
    value: "5+",
    label: "Core Services",
    icon: BarChart3,
  },
  {
    value: "4",
    label: "Extra Platforms",
    icon: TrendingUp,
  },
  {
    value: "24/7",
    label: "Content Support",
    icon: Users,
  },
];

const listingNeeds = [
  "SEO-ready product title with high-intent keywords",
  "Benefit-focused description and scannable feature bullets",
  "Category attributes, variations, dimensions, and compliance details",
  "High-quality product images, lifestyle visuals, and short-form videos",
  "Review insights, rating signals, Q&A topics, and conversion blockers",
  "Competitor keyword gaps, pricing notes, and seasonal content updates",
];

const workflowSlides = [
  {
    title: "Ratings",
    eyebrow: "Trust signal growth",
    icon: Star,
    image: "/assets/case-study.png",
    imageAlt: "Ratings performance dashboard",
    summary:
      "We identify what helps shoppers feel confident before they buy, then improve product page signals that support stronger ratings over time.",
    points: [
      "Rating health audit by product and category",
      "Product issue patterns from low-star feedback",
      "Trust-building content recommendations",
    ],
    metrics: ["Rating gaps", "Quality signals", "Trust blockers"],
  },
  {
    title: "Reviews",
    eyebrow: "Shopper voice analysis",
    icon: MessageCircle,
    image: "/assets/insight-dashboard.png",
    imageAlt: "Review insights dashboard",
    summary:
      "We turn review language into action: missing product details, recurring objections, buyer questions, and opportunities for better listing clarity.",
    points: [
      "Positive and negative review theme mapping",
      "Response guidance for repeated buyer concerns",
      "Content updates based on shopper objections",
    ],
    metrics: ["Review themes", "Buyer concerns", "Q&A gaps"],
  },
  {
    title: "SEO",
    eyebrow: "Target search visibility",
    icon: Tags,
    image: "/assets/target-marketplace-analytics.png",
    imageAlt: "Product SEO analytics platform",
    summary:
      "We optimize product titles, descriptions, bullets, and attributes so listings are easier for shoppers and platform search to understand.",
    points: [
      "Title and bullet optimization",
      "Attribute and taxonomy completeness check",
      "Competitor listing comparison",
    ],
    metrics: ["Search terms", "Content score", "Attribute gaps"],
  },
  {
    title: "Keyword Research",
    eyebrow: "Search intent planning",
    icon: KeyRound,
    image: "/assets/hero-dashboard-clean.png",
    imageAlt: "Keyword research dashboard",
    summary:
      "We build keyword maps around buyer intent, product use cases, seasonal demand, and competitor positioning for Target Platform listings.",
    points: [
      "Primary and secondary keyword groups",
      "Seasonal and category trend planning",
      "Keyword-to-content placement guidance",
    ],
    metrics: ["Intent map", "Seasonal terms", "Ranking gaps"],
  },
  {
    title: "Content Management",
    eyebrow: "Assets and listing copy",
    icon: PenTool,
    image: "/assets/case-study.png",
    imageAlt: "Product content management workspace",
    summary:
      "We create and organize the listing materials products need: high-quality images, video direction, titles, descriptions, bullets, and content updates.",
    points: [
      "Image, video, title, and description planning",
      "Benefit-led bullets and shopper-friendly copy",
      "Ongoing content refresh recommendations",
    ],
    metrics: ["Images", "Video brief", "Copy updates"],
  },
];

const testimonials = [
  {
    name: "Ariana Mills",
    email: "ariana.mills@example.com",
    title: "Our Target listings finally looked retail-ready",
    description:
      "MR InfinityX rewrote our titles, refreshed our images, and mapped review concerns into better product copy. The listings became easier for shoppers to understand and easier for our team to maintain.",
    storeUrl: "https://www.target.com/s?searchTerm=home+organization",
    rating: "5.0",
    category: "Home Organization",
  },
  {
    name: "Daniel Cross",
    email: "daniel.cross@example.com",
    title: "Keyword research changed how we planned content",
    description:
      "The keyword plan gave us a clear structure for titles, bullets, attributes, and seasonal updates. We stopped guessing and started building every product page around buyer intent.",
    storeUrl: "https://www.target.com/s?searchTerm=kitchen+storage",
    rating: "4.9",
    category: "Kitchen Storage",
  },
  {
    name: "Maya Benton",
    email: "maya.benton@example.com",
    title: "Reviews became a roadmap for better listings",
    description:
      "Their review analysis showed the exact questions shoppers still had. We used those insights to improve descriptions, image order, and product highlights across our Target catalog.",
    storeUrl: "https://www.target.com/s?searchTerm=beauty+tools",
    rating: "5.0",
    category: "Beauty Tools",
  },
  {
    name: "Ethan Rowe",
    email: "ethan.rowe@example.com",
    title: "Content management became much smoother",
    description:
      "They organized product images, copy, SEO notes, and update priorities in one workflow. It helped our team launch new Target products with less back-and-forth.",
    storeUrl: "https://www.target.com/s?searchTerm=pet+supplies",
    rating: "4.8",
    category: "Pet Supplies",
  },
];

type WorkflowSlide = (typeof workflowSlides)[number];
type Testimonial = (typeof testimonials)[number];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWorkflowSlide, setActiveWorkflowSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const selectedWorkflowSlide = workflowSlides[activeWorkflowSlide];
  const selectedTestimonial = testimonials[activeTestimonial];
  const WorkflowIcon = selectedWorkflowSlide.icon;

  const showPreviousWorkflowSlide = () => {
    setActiveWorkflowSlide((current) =>
      current === 0 ? workflowSlides.length - 1 : current - 1,
    );
  };

  const showNextWorkflowSlide = () => {
    setActiveWorkflowSlide((current) =>
      current === workflowSlides.length - 1 ? 0 : current + 1,
    );
  };

  const showPreviousTestimonial = () => {
    setActiveTestimonial((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNextTestimonial = () => {
    setActiveTestimonial((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <main className={styles.shell}>
      <HeaderSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <ServicesSection />
      <WorkflowSection
        activeWorkflowSlide={activeWorkflowSlide}
        selectedWorkflowSlide={selectedWorkflowSlide}
        WorkflowIcon={WorkflowIcon}
        showPreviousWorkflowSlide={showPreviousWorkflowSlide}
        showNextWorkflowSlide={showNextWorkflowSlide}
        setActiveWorkflowSlide={setActiveWorkflowSlide}
      />
      <TestimonialsSection
        activeTestimonial={activeTestimonial}
        selectedTestimonial={selectedTestimonial}
        showPreviousTestimonial={showPreviousTestimonial}
        showNextTestimonial={showNextTestimonial}
        setActiveTestimonial={setActiveTestimonial}
      />
      <FeatureSection />
      <NeedsSection />
      <StatsSection />
      <PlatformsSection />
      <FooterSection />
    </main>
  );
}

function HeaderSection({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className={styles.headerSection} aria-label="Site navigation">
      <div className={styles.container}>
        <header className={styles.header}>
          <a className={styles.brand} href="#" aria-label="MR Infinityx home">
            <span className={styles.logoMark}>
              <Box size={22} strokeWidth={3} />
            </span>
            <span>MR Infinityx</span>
          </a>

          <nav className={styles.nav} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <a className={styles.greenButton} href="#">
              Get Started
            </a>
          </div>

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
                <a
                  href={item.href}
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              className={styles.mobileMenuCta}
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </header>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Target platform services homepage">
      <div className={styles.container}>
        <div className={styles.heroCopy}>
          <h1>
            Grow Your Target Products with
            <br />MR Infinity<span>X</span>
          </h1>
          <p>
            We help brands improve Target product pages with ratings strategy,
            review insights, product SEO, keyword research, and conversion-ready
            content management.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.greenButton} href="#">
              Get Started
            </a>
            <a className={styles.outlineButton} href="#">
              Learn More <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className={styles.heroArt}>
          <Image
            src="/assets/hero-dashboard-clean.png"
            alt="Floating enterprise analytics dashboard"
            width={670}
            height={530}
            priority
          />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>
        <h2>Our Services</h2>
        <div className={styles.serviceGrid}>
          {services.map(({ title, copy, icon: Icon }) => (
            <article className={styles.serviceCard} key={title}>
              <span className={styles.serviceIcon}>
                <Icon size={31} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <a href="#" aria-label={`${title} service details`}>
                <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({
  activeWorkflowSlide,
  selectedWorkflowSlide,
  WorkflowIcon,
  showPreviousWorkflowSlide,
  showNextWorkflowSlide,
  setActiveWorkflowSlide,
}: {
  activeWorkflowSlide: number;
  selectedWorkflowSlide: WorkflowSlide;
  WorkflowIcon: LucideIcon;
  showPreviousWorkflowSlide: () => void;
  showNextWorkflowSlide: () => void;
  setActiveWorkflowSlide: Dispatch<SetStateAction<number>>;
}) {
  return (
    <section
      className={styles.caseSection}
      id="process"
      aria-label="Service workflow slider"
    >
      <div className={styles.container}>
        <div className={styles.caseHeader}>
          <div>
            <span>Optimization workflow</span>
            <h2>How We Improve Target Listings</h2>
          </div>
          <div className={styles.sliderControls} aria-label="Slider controls">
            <button
              type="button"
              className={styles.sliderButton}
              aria-label="Show previous service"
              onClick={showPreviousWorkflowSlide}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={styles.sliderButton}
              aria-label="Show next service"
              onClick={showNextWorkflowSlide}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.caseGrid}>
          <div className={styles.caseImage}>
            <Image
              src={selectedWorkflowSlide.image}
              alt={selectedWorkflowSlide.imageAlt}
              width={646}
              height={332}
              priority={activeWorkflowSlide === 0}
            />
            <div className={styles.slideImageBadge}>
              <WorkflowIcon size={18} />
              <span>{selectedWorkflowSlide.title}</span>
            </div>
          </div>

          <article className={styles.caseCard}>
            <div className={styles.slideMeta}>
              <span className={styles.activeTab}>
                <WorkflowIcon size={20} /> {selectedWorkflowSlide.eyebrow}
              </span>
              <span>
                {String(activeWorkflowSlide + 1).padStart(2, "0")} /{" "}
                {String(workflowSlides.length).padStart(2, "0")}
              </span>
            </div>
            <h3>{selectedWorkflowSlide.title}</h3>
            <p>{selectedWorkflowSlide.summary}</p>
            <ul className={styles.slideList}>
              {selectedWorkflowSlide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.slideStats}>
              {selectedWorkflowSlide.metrics.map((metric) => (
                <span key={metric}>{metric}</span>
              ))}
            </div>
            <a href="#">
              Explore {selectedWorkflowSlide.title} <ArrowRight size={17} />
            </a>
          </article>
        </div>

        <div className={styles.dots} aria-label="Workflow slides">
          {workflowSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.title}
              className={index === activeWorkflowSlide ? styles.activeDot : ""}
              aria-label={`Show ${slide.title} slide`}
              aria-current={index === activeWorkflowSlide ? "true" : undefined}
              onClick={() => setActiveWorkflowSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({
  activeTestimonial,
  selectedTestimonial,
  showPreviousTestimonial,
  showNextTestimonial,
  setActiveTestimonial,
}: {
  activeTestimonial: number;
  selectedTestimonial: Testimonial;
  showPreviousTestimonial: () => void;
  showNextTestimonial: () => void;
  setActiveTestimonial: Dispatch<SetStateAction<number>>;
}) {
  return (
    <section
      className={styles.testimonialsSection}
      id="testimonials"
      aria-label="Client testimonials"
    >
      <div className={styles.container}>
        <div className={styles.testimonialHeader}>
          <div>
            <span>Client testimonials</span>
            <h2>Target Platform results, told by clients</h2>
          </div>
          <div className={styles.sliderControls} aria-label="Testimonial controls">
            <button
              type="button"
              className={styles.sliderButton}
              aria-label="Show previous testimonial"
              onClick={showPreviousTestimonial}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={styles.sliderButton}
              aria-label="Show next testimonial"
              onClick={showNextTestimonial}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.testimonialSlider}>
          <article className={styles.testimonialFeature}>
            <div className={styles.testimonialQuote}>
              <Quote size={30} />
            </div>
            <div className={styles.testimonialBody}>
              <span className={styles.testimonialCategory}>
                {selectedTestimonial.category}
              </span>
              <h3>{selectedTestimonial.title}</h3>
              <p>{selectedTestimonial.description}</p>
            </div>
            <div className={styles.testimonialFooter}>
              <div>
                <strong>{selectedTestimonial.name}</strong>
                <a href={`mailto:${selectedTestimonial.email}`}>
                  <Mail size={15} />
                  {selectedTestimonial.email}
                </a>
              </div>
              <span className={styles.testimonialRating}>
                <Star size={16} fill="currentColor" />
                {selectedTestimonial.rating}
              </span>
            </div>
          </article>

          <article className={styles.testimonialPreview} aria-label="Target store preview">
            <span>Target Store</span>
            <h3>{selectedTestimonial.name.split(" ")[0]}{"'"}s product page</h3>
            <p>
              Review the live-style Target store page connected with this client
              testimonial.
            </p>
            <a
              href={selectedTestimonial.storeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ShoppingBag size={17} />
              See Target Store
              <ArrowRight size={17} />
            </a>
          </article>
        </div>

        <div className={styles.testimonialDots} aria-label="Testimonial slides">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.email}
              className={index === activeTestimonial ? styles.activeTestimonialDot : ""}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === activeTestimonial ? "true" : undefined}
              onClick={() => setActiveTestimonial(index)}
            >
              <span>{testimonial.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className={styles.featureSection} aria-label="Product page analysis">
      <div className={styles.container}>
        <div className={styles.featureBlock}>
          <div className={styles.featureImage}>
            <Image
              src="/assets/target-marketplace-analytics.png"
              alt="Real-time reporting dashboard"
              width={420}
              height={296}
            />
          </div>
          <article className={styles.featureCopy}>
            <span>AI-assisted analysis</span>
            <h2>What Target Product Pages Need</h2>
            <p>
              We review product detail pages for SEO coverage, visual quality,
              content depth, shopper trust, category requirements, and conversion
              friction.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function NeedsSection() {
  return (
    <section className={styles.needsSection} aria-label="Target product page requirements">
      <div className={styles.container}>
        <div className={styles.needsGrid}>
          {listingNeeds.map((item) => (
            <article key={item}>
              <span>
                <ShoppingBag size={18} />
              </span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={styles.bottomStats} aria-label="Service highlights">
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {bottomStats.map(({ value, label, icon: Icon }) => (
            <article key={label}>
              <span className={styles.statIcon}>
                <Icon size={21} />
              </span>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformsSection() {
  return (
    <section
      className={styles.platformsSection}
      id="platforms"
      aria-label="Other supported marketplace services"
    >
      <div className={styles.container}>
        <div className={styles.partnerRow}>
          {platforms.map((platform) => (
            <article className={styles.platformCard} key={platform.name}>
              <PlatformLogo slug={platform.slug} name={platform.name} />
              <p>{platform.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <FooterColumn
            title="Company"
            links={["About Us", "Process", "Platforms", "Contact"]}
          />
          <FooterColumn
            title="Services"
            links={["Ratings", "Reviews", "Product SEO", "Content"]}
          />
          <FooterColumn
            title="Platforms"
            links={["Target Platform", "Amazon", "Walmart", "eBay"]}
          />
          <FooterColumn
            title="Resources"
            links={["SEO Audit", "Keyword Plan", "Content Brief", "Help Center"]}
          />

          <div className={styles.newsletter}>
            <h3>Subscribe to our newsletter</h3>
            <form>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
            <p>Get product SEO, content, and marketplace optimization notes.</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>(c) 2026 MR InfinityX. Independent marketplace services.</p>
          <div className={styles.socials} aria-label="Social links">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Twitter">
              x
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
          </div>
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
  links: string[];
}) {
  return (
    <div className={styles.footerColumn}>
      <h3>{title}</h3>
      {links.map((link) => (
        <a href="#" key={link}>
          {link}
        </a>
      ))}
    </div>
  );
}

function PlatformLogo({ slug, name }: { slug: string; name: string }) {
  if (slug === "ebay") {
    return (
      <span className={`${styles.platformLogo} ${styles.ebayLogo}`} aria-label={name}>
        <span>e</span>
        <span>B</span>
        <span>a</span>
        <span>y</span>
      </span>
    );
  }

  if (slug === "walmart") {
    return (
      <span className={`${styles.platformLogo} ${styles.walmartLogo}`} aria-label={name}>
        <span>Walmart</span>
        <span className={styles.walmartSpark} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
    );
  }

  if (slug === "chewy") {
    return (
      <span className={`${styles.platformLogo} ${styles.chewyLogo}`} aria-label={name}>
        Chewy
      </span>
    );
  }

  return (
    <span className={`${styles.platformLogo} ${styles.amazonLogo}`} aria-label={name}>
      amazon
      <span aria-hidden="true" />
    </span>
  );
}
