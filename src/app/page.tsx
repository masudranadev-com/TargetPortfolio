"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
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
    visual: "ratings",
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
    visual: "reviews",
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
    visual: "seo",
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
    visual: "keyword",
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
    visual: "content",
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
  {
    title: "Customer Q/A Post",
    eyebrow: "Shopper confidence answers",
    icon: ClipboardList,
    visual: "qa",
    image: "/assets/case-study.png",
    imageAlt: "Customer question and answer workspace",
    summary:
      "We create useful Q&A content for AirPods shoppers so common objections are answered before checkout.",
    points: [
      "Identify buyer questions from reviews and search intent",
      "Write concise answers that support product confidence",
      "Publish helpful Q&A posts for the Target product page",
    ],
    metrics: ["5 Q&A posts", "Buyer concerns", "Answer quality"],
  },
];

const testimonials = [
  {
    name: "anna-kaci",
    email: "support@anna-kaci.com",
    title: "Fashion listings that celebrate brand identity",
    description:
      "Anna Kaci focuses on contemporary statement pieces, seamless transactions, and a polished customer experience. Their Target presence benefits from clear brand storytelling, product sourcing details, and listing content that reflects the design quality recognized by national publications.",
    storeUrl: "https://www.target.com/s?searchTerm=anna+kaci",
    rating: "5.0",
    category: "Fashion Apparel",
  },
  {
    name: "Case-Mate",
    email: "marketplace.support@case-mate.com",
    title: "Premium accessory content built for confidence",
    description:
      "Case-Mate brings stylish phone cases, screen protectors, and wireless charging accessories to Target shoppers. Strong listing copy helps communicate premium materials, drop protection, device compatibility, and warranty-backed product confidence.",
    storeUrl: "https://www.target.com/s?searchTerm=case-mate",
    rating: "4.9",
    category: "Phone Accessories",
  },
  {
    name: "Dealio Centric",
    email: "support@dealiocentric.com",
    title: "Value-focused catalog content made easier to shop",
    description:
      "Dealio Centric offers a broad assortment across electronics, apparel, home decor, and everyday essentials. Their listings need clear value messaging, product organization, and helpful content that lets shoppers discover strong deals with confidence.",
    storeUrl: "https://www.target.com/s?searchTerm=dealio+centric",
    rating: "5.0",
    category: "Value Marketplace",
  },
  {
    name: "Entro Wholesale LLC",
    email: "entrowalmart@gmail.com",
    title: "Mobile accessory listings with clearer buyer guidance",
    description:
      "Entro Wholesale offers phone cases, screen protectors, and charging accessories with a focus on quality, durability, and style. Better product content helps shoppers compare protection levels, device fit, and accessory use cases faster.",
    storeUrl: "https://www.target.com/s?searchTerm=phone+accessories",
    rating: "4.8",
    category: "Mobile Accessories",
  },
];

type WorkflowSlide = (typeof workflowSlides)[number];
type Testimonial = (typeof testimonials)[number];

const ratingsVisualData = {
  average: 5.0,
  totalRatings: 70,
  features: [
    { name: "ease of use", value: 5.0 },
    { name: "value", value: 5.0 },
    { name: "features", value: 5.0 },
    { name: "display", value: 5.0 },
  ],
  distribution: [
    { stars: 5, count: 70 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  recommendPercent: 40,
};

const emptyRatingsVisualData = {
  average: 0,
  totalRatings: 0,
  features: ratingsVisualData.features.map((feature) => ({
    ...feature,
    value: 0,
  })),
  distribution: ratingsVisualData.distribution.map((row) => ({
    ...row,
    count: 0,
  })),
  recommendPercent: 0,
};

const negativeReviewSamples = [
  {
    date: "8 July, 2026",
    title: "complete fraud",
    copy:
      "The product looked different from the listing and the return path felt confusing. I could not tell what was real until support stepped in.",
  },
  {
    date: "9 July, 2026",
    title: "not what the page promised",
    copy:
      "Important size and compatibility details were missing, so the item did not work for my setup.",
  },
  {
    date: "10 July, 2026",
    title: "poor instructions",
    copy:
      "The box arrived fine, but the setup steps were unclear and the photos did not explain the product well.",
  },
  {
    date: "11 July, 2026",
    title: "quality was disappointing",
    copy:
      "I expected better material from the description. The listing made it sound more durable than it felt.",
  },
  {
    date: "12 July, 2026",
    title: "had to return it",
    copy:
      "The benefits were overstated and the Q&A did not answer the issue I had before buying.",
  },
];

const positiveReviewSamples = [
  {
    date: "18 July, 2026",
    title: "clear details, easy decision",
    copy:
      "The updated photos, sizing notes, and bullets answered everything I needed before checkout.",
  },
  {
    date: "19 July, 2026",
    title: "exactly as described",
    copy:
      "The product matched the listing and the feature callouts made it easy to pick the right option.",
  },
  {
    date: "20 July, 2026",
    title: "helpful customer answers",
    copy:
      "The Q&A covered my concern, and the product page felt honest about what to expect.",
  },
  {
    date: "21 July, 2026",
    title: "great value",
    copy:
      "The description was accurate, the images were useful, and the item worked the way I hoped.",
  },
  {
    date: "22 July, 2026",
    title: "would buy again",
    copy:
      "The listing made the benefits simple to compare and I felt confident ordering another one.",
  },
];

const seoSearchResults = [
  "AirPods Pro 2nd Gen with MagSafe Case",
  "Wireless Earbuds with Noise Control",
  "AirPods 4 Bluetooth Earphones",
  "Open-Ear Sport Wireless Headphones",
  "Premium Earbuds with USB-C Case",
  "Noise Cancelling Travel Earbuds",
  "Everyday Wireless Audio Pods",
  "Bluetooth Earbuds for iPhone",
  "Compact Earbuds with Charging Case",
  "MR InfinityX AirPods Cleaning Kit",
];

const keywordResearchMetrics = [
  { label: "Volume", value: "673K", detail: "US monthly searches" },
  { label: "Traffic", value: "1.8M", detail: "estimated visits" },
  { label: "KD", value: "78%", detail: "hard competition" },
  { label: "CPC", value: "$1.42", detail: "paid search avg." },
];

const keywordIdeas = [
  { keyword: "airpods pro", volume: "246K", intent: "Commercial", kd: "82%" },
  { keyword: "airpods 4", volume: "135K", intent: "Transactional", kd: "74%" },
  { keyword: "airpods case", volume: "90.5K", intent: "Commercial", kd: "61%" },
  { keyword: "airpods cleaning kit", volume: "12.1K", intent: "Transactional", kd: "38%" },
];

const keywordTrendBars = [42, 48, 54, 61, 57, 69, 76, 72, 84, 92, 88, 96];

const contentAssets = [
  { label: "Hero image", status: "Approved", progress: 100 },
  { label: "Lifestyle set", status: "Editing", progress: 72 },
  { label: "Video brief", status: "Ready", progress: 88 },
  { label: "A+ copy", status: "Drafting", progress: 64 },
];

const contentCopyBlocks = [
  "Target-ready title with primary keyword placement",
  "Benefit-led bullets for fast product scanning",
  "Description refresh based on reviews and Q&A",
];

const qaPosts = [
  {
    question: "Will these AirPods work with my iPhone?",
    answer:
      "Yes. AirPods pair quickly with iPhone through Bluetooth and support automatic setup when your device is updated.",
  },
  {
    question: "How long does the battery usually last?",
    answer:
      "Battery life depends on the model and listening mode, but the charging case helps extend use throughout the day.",
  },
  {
    question: "Can I use them for calls and meetings?",
    answer:
      "Yes. AirPods include built-in microphones for calls, video meetings, and voice assistant commands.",
  },
  {
    question: "Are they comfortable for everyday use?",
    answer:
      "Most shoppers use them comfortably for daily listening. Choose the model and fit style that matches your ear preference.",
  },
  {
    question: "What should I check before buying?",
    answer:
      "Check model generation, case type, compatibility, return policy, and whether the listing includes all expected accessories.",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeWorkflowSlide, setActiveWorkflowSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isWorkflowPaused, setIsWorkflowPaused] = useState(false);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

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

  useEffect(() => {
    if (isWorkflowPaused) {
      return;
    }

    const workflowTimer = window.setInterval(() => {
      setActiveWorkflowSlide((current) =>
        current === workflowSlides.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => window.clearInterval(workflowTimer);
  }, [isWorkflowPaused]);

  useEffect(() => {
    if (isTestimonialPaused) {
      return;
    }

    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) =>
        current === testimonials.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => window.clearInterval(testimonialTimer);
  }, [isTestimonialPaused]);

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
        setIsWorkflowPaused={setIsWorkflowPaused}
        setActiveWorkflowSlide={setActiveWorkflowSlide}
      />
      <TestimonialsSection
        activeTestimonial={activeTestimonial}
        selectedTestimonial={selectedTestimonial}
        showPreviousTestimonial={showPreviousTestimonial}
        showNextTestimonial={showNextTestimonial}
        setIsTestimonialPaused={setIsTestimonialPaused}
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

function WorkflowVisual({
  slide,
  WorkflowIcon,
  isPriority,
}: {
  slide: WorkflowSlide;
  WorkflowIcon: LucideIcon;
  isPriority: boolean;
}) {
  if ("visual" in slide && slide.visual === "ratings") {
    return (
      <div className={styles.caseVisual}>
        <RatingsWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  if ("visual" in slide && slide.visual === "reviews") {
    return (
      <div className={styles.caseVisual}>
        <ReviewsWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  if ("visual" in slide && slide.visual === "seo") {
    return (
      <div className={styles.caseVisual}>
        <SeoWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  if ("visual" in slide && slide.visual === "keyword") {
    return (
      <div className={styles.caseVisual}>
        <KeywordWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  if ("visual" in slide && slide.visual === "content") {
    return (
      <div className={styles.caseVisual}>
        <ContentWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  if ("visual" in slide && slide.visual === "qa") {
    return (
      <div className={styles.caseVisual}>
        <QaWorkflowVisual />
        <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
      </div>
    );
  }

  return (
    <div className={styles.caseImage}>
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        width={646}
        height={332}
        priority={isPriority}
      />
      <SlideImageBadge WorkflowIcon={WorkflowIcon} title={slide.title} />
    </div>
  );
}

function QaWorkflowVisual() {
  return (
    <section className={styles.qaPreview} aria-label="Customer question answer animation">
      <div className={styles.qaTopbar}>
        <div>
          <span>Target product Q&A</span>
          <strong>AirPods shopper questions</strong>
        </div>
        <em>Answer builder</em>
      </div>

      <div className={styles.qaStage}>
        <div className={styles.qaEmptyState}>
          <strong>0</strong>
          <span>Customer questions & answers</span>
        </div>

        <div className={styles.qaBoard}>
          <div className={styles.qaCounter}>
            <span>Published Q&A</span>
            <strong>5</strong>
          </div>

          <div className={styles.qaList}>
            {qaPosts.map((post, index) => (
              <article
                className={styles.qaCard}
                key={post.question}
                style={{ "--qa-index": index } as CSSProperties}
              >
                <div className={styles.qaQuestion}>
                  <span>Q</span>
                  <strong>{post.question}</strong>
                </div>
                <div className={styles.qaAnswer}>
                  <span>A</span>
                  <p>{post.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentWorkflowVisual() {
  return (
    <section className={styles.contentPreview} aria-label="Content management workspace">
      <div className={styles.contentTopbar}>
        <div>
          <span>Target PDP workspace</span>
          <strong>AirPods accessory listing</strong>
        </div>
        <em>Launch pack</em>
      </div>

      <div className={styles.contentWorkspaceGrid}>
        <article className={styles.contentAssetPanel}>
          <div className={styles.contentPanelHeader}>
            <span>Assets</span>
            <strong>Images & video</strong>
          </div>
          <div className={styles.contentAssetPreview}>
            <div className={styles.contentHeroThumb} />
            <div className={styles.contentThumbGrid}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.contentAssetRows}>
            {contentAssets.map((asset, index) => (
              <div
                className={styles.contentAssetRow}
                key={asset.label}
                style={
                  {
                    "--content-index": index,
                    "--content-progress": `${asset.progress}%`,
                  } as CSSProperties
                }
              >
                <div>
                  <strong>{asset.label}</strong>
                  <span>{asset.status}</span>
                </div>
                <i />
              </div>
            ))}
          </div>
        </article>

        <article className={styles.contentCopyPanel}>
          <div className={styles.contentPanelHeader}>
            <span>Listing copy</span>
            <strong>SEO-ready content</strong>
          </div>
          <div className={styles.contentTitleEditor}>
            <span>Product title</span>
            <strong>AirPods Cleaning Kit with Soft Brushes and Travel Case</strong>
          </div>
          <div className={styles.contentCopyList}>
            {contentCopyBlocks.map((block, index) => (
              <p
                key={block}
                style={{ "--content-index": index } as CSSProperties}
              >
                {block}
              </p>
            ))}
          </div>
        </article>
      </div>

      <div className={styles.contentBottomGrid}>
        <article className={styles.contentBriefCard}>
          <span>Video brief</span>
          <strong>15s product use demo</strong>
          <p>Hook, close-up cleaning shot, before/after frame, and CTA.</p>
        </article>
        <article className={styles.contentPublishCard}>
          <span>Content update</span>
          <strong>Ready for Target review</strong>
          <div>
            <i />
            <i />
            <i />
          </div>
        </article>
      </div>
    </section>
  );
}

function KeywordWorkflowVisual() {
  return (
    <section className={styles.keywordPreview} aria-label="Keyword research dashboard">
      <div className={styles.keywordToolbar}>
        <span>SEMRUSH</span>
        <div className={styles.keywordSearchInput}>
          <strong>AirPods</strong>
        </div>
        <div className={styles.keywordScope}>
          <span>US</span>
          <span>Desktop</span>
        </div>
        <button type="button">Analyze</button>
      </div>

      <div className={styles.keywordInsightStrip}>
        <span>Keyword Overview</span>
        <span>Broad match</span>
        <span>Commercial intent</span>
      </div>

      <div className={styles.keywordMetricsGrid}>
        {keywordResearchMetrics.map((metric, index) => (
          <article
            className={styles.keywordMetricCard}
            key={metric.label}
            style={{ "--keyword-index": index } as CSSProperties}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <div className={styles.keywordDashboardGrid}>
        <article className={styles.keywordTrendCard}>
          <div>
            <span>Trend</span>
            <strong>Demand rising for AirPods</strong>
          </div>
          <div className={styles.keywordTrendChart} aria-label="Keyword trend chart">
            {keywordTrendBars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                style={
                  {
                    "--trend-height": `${height}%`,
                    "--keyword-index": index,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </article>

        <article className={styles.keywordIntentCard}>
          <span>Intent mix</span>
          <div className={styles.keywordIntentRing}>
            <strong>72%</strong>
            <small>commercial</small>
          </div>
          <p>Best pages should compare features, use cases, price, and compatible accessories.</p>
        </article>
      </div>

      <article className={styles.keywordIdeasCard}>
        <div className={styles.keywordIdeasHeader}>
          <span>Keyword ideas</span>
          <strong>Cluster by purchase intent</strong>
        </div>
        <div className={styles.keywordIdeasRows}>
          <div className={styles.keywordIdeaHeader}>
            <span>Keyword</span>
            <span>Volume</span>
            <span>Intent</span>
            <span>KD</span>
          </div>
          {keywordIdeas.map((idea, index) => (
            <div
              className={styles.keywordIdeaRow}
              key={idea.keyword}
              style={{ "--keyword-index": index } as CSSProperties}
            >
              <strong>{idea.keyword}</strong>
              <span>{idea.volume}</span>
              <span>{idea.intent}</span>
              <em>{idea.kd}</em>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function SeoWorkflowVisual() {
  return (
    <section className={styles.seoPreview} aria-label="SEO search ranking animation">
      <div className={styles.seoSearchBar}>
        <span>Search</span>
        <strong>AirPods</strong>
      </div>

      <div className={styles.seoResultsShell}>
        <div className={styles.seoResultsHeader}>
          <span>Top 10 results</span>
          <strong>Target marketplace</strong>
        </div>

        <ol className={styles.seoResultsList} aria-label="AirPods search results">
          {seoSearchResults.map((product, index) => {
            const isOwnedProduct = index === seoSearchResults.length - 1;

            return (
              <li
                className={
                  isOwnedProduct ? styles.seoOwnedResult : styles.seoResultItem
                }
                key={product}
                style={
                  {
                    "--seo-index": index,
                  } as CSSProperties
                }
              >
                <span>{index + 1}</span>
                <div>
                  <strong>{product}</strong>
                  <small>
                    {isOwnedProduct
                      ? "Our product starts low before optimization"
                      : "Sponsored placement and strong listing signals"}
                  </small>
                </div>
                <em>{isOwnedProduct ? "Needs SEO" : "Visible"}</em>
              </li>
            );
          })}
        </ol>

        <div className={styles.seoOptimizePopup} aria-hidden="true">
          <span>After optimize</span>
        </div>

        <div className={styles.seoRankLift} aria-hidden="true">
          <span>#1</span>
          <strong>MR InfinityX AirPods Cleaning Kit</strong>
          <small>Title, bullets, attributes, and keywords optimized</small>
        </div>
      </div>
    </section>
  );
}

function ReviewsWorkflowVisual() {
  return (
    <section className={styles.reviewsPreview} aria-label="Review sentiment animation">
      <div className={styles.reviewsStage}>
        <div className={styles.reviewStackBefore} aria-label="One star reviews">
          {negativeReviewSamples.map((review, index) => (
            <ReviewPreviewCard
              key={review.title}
              review={review}
              rating={1}
              recommended={false}
              index={index}
            />
          ))}
        </div>

        <div className={styles.reviewBlush} aria-hidden="true">
          <span>After optimize</span>
        </div>

        <div className={styles.reviewStackAfter} aria-label="Five star reviews">
          {positiveReviewSamples.map((review, index) => (
            <ReviewPreviewCard
              key={review.title}
              review={review}
              rating={5}
              recommended
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewPreviewCard({
  review,
  rating,
  recommended,
  index,
}: {
  review: { date: string; title: string; copy: string };
  rating: 1 | 5;
  recommended: boolean;
  index: number;
}) {
  const stars = Array.from({ length: 5 }, (_, starIndex) =>
    starIndex < rating ? "★" : "☆",
  ).join("");
  const reviewDelay = recommended ? 3150 + index * 90 : index * 90;

  return (
    <article
      className={styles.reviewPreviewCard}
      style={
        {
          "--review-delay": `${reviewDelay}ms`,
          "--review-top": `${index * 86}px`,
        } as CSSProperties
      }
    >
      <div className={styles.reviewTopline}>
        <span className={styles.reviewStars}>{stars}</span>
        <span
          className={
            recommended
              ? styles.reviewRecommendationGood
              : styles.reviewRecommendationBad
          }
        >
          {recommended ? "Would recommend" : "Would not recommend"}
        </span>
      </div>
      <span className={styles.reviewDate}>{review.date}</span>
      <h3>{review.title}</h3>
      <p>{review.copy}</p>
      <div className={styles.reviewActions}>
        <span>{recommended ? "16 guests found this helpful." : "2 guests found this helpful."}</span>
        <button type="button">Helpful</button>
        <button type="button">Not helpful</button>
      </div>
    </article>
  );
}

function SlideImageBadge({
  WorkflowIcon,
  title,
}: {
  WorkflowIcon: LucideIcon;
  title: string;
}) {
  return (
    <div className={styles.slideImageBadge}>
      <WorkflowIcon size={18} />
      <span>{title}</span>
    </div>
  );
}

function RatingsWorkflowVisual() {
  const [ratings, setRatings] = useState(emptyRatingsVisualData);

  useEffect(() => {
    const duration = 3000;
    const startedAt = performance.now();
    let animationFrame = 0;

    const clamp = (number: number, min: number, max: number) =>
      Math.min(Math.max(number, min), max);
    const lerp = (start: number, end: number, progress: number) =>
      start + (end - start) * progress;
    const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

    const animate = (now: number) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const easedProgress = easeOutCubic(progress);

      setRatings({
        average: lerp(
          emptyRatingsVisualData.average,
          ratingsVisualData.average,
          easedProgress,
        ),
        totalRatings: lerp(
          emptyRatingsVisualData.totalRatings,
          ratingsVisualData.totalRatings,
          easedProgress,
        ),
        features: ratingsVisualData.features.map((feature, index) => ({
          name: feature.name,
          value: lerp(
            emptyRatingsVisualData.features[index].value,
            feature.value,
            easedProgress,
          ),
        })),
        distribution: ratingsVisualData.distribution.map((row, index) => ({
          stars: row.stars,
          count: lerp(
            emptyRatingsVisualData.distribution[index].count,
            row.count,
            easedProgress,
          ),
        })),
        recommendPercent: lerp(
          emptyRatingsVisualData.recommendPercent,
          ratingsVisualData.recommendPercent,
          easedProgress,
        ),
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const totalRatings = Math.round(ratings.totalRatings);
  const recommendPercent = Math.round(ratings.recommendPercent);
  const recommendCount = Math.round((totalRatings * recommendPercent) / 100);
  const starFill = Math.min(Math.max((ratings.average / 5) * 100, 0), 100);

  return (
    <section className={styles.ratingsPreviewCard} aria-label="Guest ratings preview">
      <h3>Guest ratings &amp; reviews</h3>

      <div className={styles.ratingsSummary}>
        <div className={styles.ratingsScore}>{ratings.average.toFixed(1)}</div>
        <div className={styles.ratingsStarsBlock}>
          <div className={styles.ratingsStars} aria-label="Average rating">
            <div className={styles.ratingsStarsEmpty}>★★★★★</div>
            <div
              className={styles.ratingsStarsFilled}
              style={{ width: `${starFill}%` }}
            >
              ★★★★★
            </div>
          </div>
          <div className={styles.ratingsCount}>
            {totalRatings.toLocaleString()} star ratings
          </div>
        </div>
        <div className={styles.ratingsTotal}>({totalRatings.toLocaleString()} total)</div>
      </div>

      <div className={styles.ratingsFeatureGrid}>
        {ratings.features.map((feature) => (
          <div className={styles.ratingsFeatureRow} key={feature.name}>
            <span>{feature.name}</span>
            <strong>{feature.value.toFixed(1)} out of 3.3</strong>
          </div>
        ))}
      </div>

      <div className={styles.ratingsDivider} />

      <div className={styles.ratingsDistribution}>
        {ratings.distribution.map((row) => {
          const count = Math.round(row.count);
          const percent = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

          return (
            <div className={styles.ratingsDistributionRow} key={row.stars}>
              <span>
                {row.stars} {row.stars === 1 ? "star" : "stars"}
              </span>
              <div
                className={styles.ratingsProgress}
                role="progressbar"
                aria-label={`${row.stars} star ratings`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div
                  className={styles.ratingsProgressFill}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <strong>
                {count.toLocaleString()} ({percent}%)
              </strong>
            </div>
          );
        })}
      </div>

      <div className={styles.ratingsDivider} />

      <div className={styles.ratingsRecommendation}>
        <div
          className={styles.ratingsRecommendRing}
          style={{
            background: `conic-gradient(#159526 0 ${recommendPercent}%, #ddd ${recommendPercent}% 100%)`,
          }}
        >
          <div>
            <span>{recommendPercent}%</span>
          </div>
        </div>
        <div>
          <strong>{recommendPercent}% would recommend</strong>
          <span>{recommendCount.toLocaleString()} recommendations</span>
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
  setIsWorkflowPaused,
  setActiveWorkflowSlide,
}: {
  activeWorkflowSlide: number;
  selectedWorkflowSlide: WorkflowSlide;
  WorkflowIcon: LucideIcon;
  showPreviousWorkflowSlide: () => void;
  showNextWorkflowSlide: () => void;
  setIsWorkflowPaused: Dispatch<SetStateAction<boolean>>;
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

        <div
          className={styles.caseGrid}
          key={activeWorkflowSlide}
          onMouseEnter={() => setIsWorkflowPaused(true)}
          onMouseLeave={() => setIsWorkflowPaused(false)}
          onFocus={() => setIsWorkflowPaused(true)}
          onBlur={() => setIsWorkflowPaused(false)}
          onPointerDown={() => setIsWorkflowPaused(true)}
          onPointerUp={() => setIsWorkflowPaused(false)}
        >
          <WorkflowVisual
            slide={selectedWorkflowSlide}
            WorkflowIcon={WorkflowIcon}
            isPriority={activeWorkflowSlide === 0}
          />

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
  setIsTestimonialPaused,
  setActiveTestimonial,
}: {
  activeTestimonial: number;
  selectedTestimonial: Testimonial;
  showPreviousTestimonial: () => void;
  showNextTestimonial: () => void;
  setIsTestimonialPaused: Dispatch<SetStateAction<boolean>>;
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

        <div
          className={styles.testimonialSlider}
          key={activeTestimonial}
          onMouseEnter={() => setIsTestimonialPaused(true)}
          onMouseLeave={() => setIsTestimonialPaused(false)}
          onFocus={() => setIsTestimonialPaused(true)}
          onBlur={() => setIsTestimonialPaused(false)}
          onPointerDown={() => setIsTestimonialPaused(true)}
          onPointerUp={() => setIsTestimonialPaused(false)}
        >
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
