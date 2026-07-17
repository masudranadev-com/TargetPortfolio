"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import homeStyles from "../../page.module.css";

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
      "The setup steps were unclear and the photos did not explain the product well.",
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
  recommendPercent: 100,
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

export function ServiceDetailVisual({ slug }: { slug: string }) {
  if (slug === "reviews") {
    return <ReviewsServiceVisual />;
  }

  if (slug === "product-seo") {
    return <SeoServiceVisual />;
  }

  if (slug === "keyword-research") {
    return <KeywordServiceVisual />;
  }

  if (slug === "content-management") {
    return <ContentServiceVisual />;
  }

  if (slug === "customer-qa-post") {
    return <QaServiceVisual />;
  }

  return <RatingsServiceVisual />;
}

function RatingsServiceVisual() {
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
  const starLine = "\u2605\u2605\u2605\u2605\u2605";

  return (
    <section className={homeStyles.ratingsPreviewCard} aria-label="Guest ratings preview">
      <h3>Guest ratings &amp; reviews</h3>

      <div className={homeStyles.ratingsSummary}>
        <div className={homeStyles.ratingsScore}>{ratings.average.toFixed(1)}</div>
        <div className={homeStyles.ratingsStarsBlock}>
          <div className={homeStyles.ratingsStars} aria-label="Average rating">
            <div className={homeStyles.ratingsStarsEmpty}>{starLine}</div>
            <div
              className={homeStyles.ratingsStarsFilled}
              style={{ width: `${starFill}%` }}
            >
              {starLine}
            </div>
          </div>
          <div className={homeStyles.ratingsCount}>
            {totalRatings.toLocaleString()} star ratings
          </div>
        </div>
        <div className={homeStyles.ratingsTotal}>({totalRatings.toLocaleString()} total)</div>
      </div>

      <div className={homeStyles.ratingsFeatureGrid}>
        {ratings.features.map((feature) => (
          <div className={homeStyles.ratingsFeatureRow} key={feature.name}>
            <span>{feature.name}</span>
            <strong>{feature.value.toFixed(1)} out of 5.0</strong>
          </div>
        ))}
      </div>

      <div className={homeStyles.ratingsDivider} />

      <div className={homeStyles.ratingsDistribution}>
        {ratings.distribution.map((row) => {
          const count = Math.round(row.count);
          const percent = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

          return (
            <div className={homeStyles.ratingsDistributionRow} key={row.stars}>
              <span>
                {row.stars} {row.stars === 1 ? "star" : "stars"}
              </span>
              <div
                className={homeStyles.ratingsProgress}
                role="progressbar"
                aria-label={`${row.stars} star ratings`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
              >
                <div
                  className={homeStyles.ratingsProgressFill}
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

      <div className={homeStyles.ratingsDivider} />

      <div className={homeStyles.ratingsRecommendation}>
        <div
          className={homeStyles.ratingsRecommendRing}
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

function ReviewsServiceVisual() {
  return (
    <section className={homeStyles.reviewsPreview} aria-label="Review sentiment animation">
      <div className={homeStyles.reviewsStage}>
        <div className={homeStyles.reviewStackBefore} aria-label="One star reviews">
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

        <div className={homeStyles.reviewBlush} aria-hidden="true">
          <span>After optimize</span>
        </div>

        <div className={homeStyles.reviewStackAfter} aria-label="Five star reviews">
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
    starIndex < rating ? "\u2605" : "\u2606",
  ).join("");
  const reviewDelay = recommended ? 3150 + index * 90 : index * 90;

  return (
    <article
      className={homeStyles.reviewPreviewCard}
      style={
        {
          "--review-delay": `${reviewDelay}ms`,
          "--review-top": `${index * 86}px`,
        } as CSSProperties
      }
    >
      <div className={homeStyles.reviewTopline}>
        <span className={homeStyles.reviewStars}>{stars}</span>
        <span
          className={
            recommended
              ? homeStyles.reviewRecommendationGood
              : homeStyles.reviewRecommendationBad
          }
        >
          {recommended ? "Would recommend" : "Would not recommend"}
        </span>
      </div>
      <span className={homeStyles.reviewDate}>{review.date}</span>
      <h3>{review.title}</h3>
      <p>{review.copy}</p>
      <div className={homeStyles.reviewActions}>
        <span>{recommended ? "16 guests found this helpful." : "2 guests found this helpful."}</span>
        <button type="button">Helpful</button>
        <button type="button">Not helpful</button>
      </div>
    </article>
  );
}

function SeoServiceVisual() {
  return (
    <section className={homeStyles.seoPreview} aria-label="SEO search ranking animation">
      <div className={homeStyles.seoSearchBar}>
        <span>Search</span>
        <strong>AirPods</strong>
      </div>

      <div className={homeStyles.seoResultsShell}>
        <div className={homeStyles.seoResultsHeader}>
          <span>Top 10 results</span>
          <strong>Target marketplace</strong>
        </div>

        <ol className={homeStyles.seoResultsList} aria-label="AirPods search results">
          {seoSearchResults.map((product, index) => {
            const isOwnedProduct = index === seoSearchResults.length - 1;

            return (
              <li
                className={
                  isOwnedProduct ? homeStyles.seoOwnedResult : homeStyles.seoResultItem
                }
                key={product}
                style={{ "--seo-index": index } as CSSProperties}
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

        <div className={homeStyles.seoOptimizePopup} aria-hidden="true">
          <span>After optimize</span>
        </div>

        <div className={homeStyles.seoRankLift} aria-hidden="true">
          <span>#1</span>
          <strong>MR InfinityX AirPods Cleaning Kit</strong>
          <small>Title, bullets, attributes, and keywords optimized</small>
        </div>
      </div>
    </section>
  );
}

function KeywordServiceVisual() {
  return (
    <section className={homeStyles.keywordPreview} aria-label="Keyword research dashboard">
      <div className={homeStyles.keywordToolbar}>
        <span>SEMRUSH</span>
        <div className={homeStyles.keywordSearchInput}>
          <strong>AirPods</strong>
        </div>
        <div className={homeStyles.keywordScope}>
          <span>US</span>
          <span>Desktop</span>
        </div>
        <button type="button">Analyze</button>
      </div>

      <div className={homeStyles.keywordInsightStrip}>
        <span>Keyword Overview</span>
        <span>Broad match</span>
        <span>Commercial intent</span>
      </div>

      <div className={homeStyles.keywordMetricsGrid}>
        {keywordResearchMetrics.map((metric, index) => (
          <article
            className={homeStyles.keywordMetricCard}
            key={metric.label}
            style={{ "--keyword-index": index } as CSSProperties}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <div className={homeStyles.keywordDashboardGrid}>
        <article className={homeStyles.keywordTrendCard}>
          <div>
            <span>Trend</span>
            <strong>Demand rising for AirPods</strong>
          </div>
          <div className={homeStyles.keywordTrendChart} aria-label="Keyword trend chart">
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

        <article className={homeStyles.keywordIntentCard}>
          <span>Intent mix</span>
          <div className={homeStyles.keywordIntentRing}>
            <strong>72%</strong>
            <small>commercial</small>
          </div>
          <p>Best pages should compare features, use cases, price, and compatible accessories.</p>
        </article>
      </div>

      <article className={homeStyles.keywordIdeasCard}>
        <div className={homeStyles.keywordIdeasHeader}>
          <span>Keyword ideas</span>
          <strong>Cluster by purchase intent</strong>
        </div>
        <div className={homeStyles.keywordIdeasRows}>
          <div className={homeStyles.keywordIdeaHeader}>
            <span>Keyword</span>
            <span>Volume</span>
            <span>Intent</span>
            <span>KD</span>
          </div>
          {keywordIdeas.map((idea, index) => (
            <div
              className={homeStyles.keywordIdeaRow}
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

function ContentServiceVisual() {
  return (
    <section className={homeStyles.contentPreview} aria-label="Content management workspace">
      <div className={homeStyles.contentTopbar}>
        <div>
          <span>Target PDP workspace</span>
          <strong>AirPods accessory listing</strong>
        </div>
        <em>Launch pack</em>
      </div>

      <div className={homeStyles.contentWorkspaceGrid}>
        <article className={homeStyles.contentAssetPanel}>
          <div className={homeStyles.contentPanelHeader}>
            <span>Assets</span>
            <strong>Images & video</strong>
          </div>
          <div className={homeStyles.contentAssetPreview}>
            <div className={homeStyles.contentHeroThumb} />
            <div className={homeStyles.contentThumbGrid}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={homeStyles.contentAssetRows}>
            {contentAssets.map((asset, index) => (
              <div
                className={homeStyles.contentAssetRow}
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

        <article className={homeStyles.contentCopyPanel}>
          <div className={homeStyles.contentPanelHeader}>
            <span>Listing copy</span>
            <strong>SEO-ready content</strong>
          </div>
          <div className={homeStyles.contentTitleEditor}>
            <span>Product title</span>
            <strong>AirPods Cleaning Kit with Soft Brushes and Travel Case</strong>
          </div>
          <div className={homeStyles.contentCopyList}>
            {contentCopyBlocks.map((block, index) => (
              <p key={block} style={{ "--content-index": index } as CSSProperties}>
                {block}
              </p>
            ))}
          </div>
        </article>
      </div>

      <div className={homeStyles.contentBottomGrid}>
        <article className={homeStyles.contentBriefCard}>
          <span>Video brief</span>
          <strong>15s product use demo</strong>
          <p>Hook, close-up cleaning shot, before/after frame, and CTA.</p>
        </article>
        <article className={homeStyles.contentPublishCard}>
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

function QaServiceVisual() {
  return (
    <section className={homeStyles.qaPreview} aria-label="Customer question answer animation">
      <div className={homeStyles.qaTopbar}>
        <div>
          <span>Target product Q&A</span>
          <strong>AirPods shopper questions</strong>
        </div>
        <em>Answer builder</em>
      </div>

      <div className={homeStyles.qaStage}>
        <div className={homeStyles.qaEmptyState}>
          <strong>0</strong>
          <span>Customer questions & answers</span>
        </div>

        <div className={homeStyles.qaBoard}>
          <div className={homeStyles.qaCounter}>
            <span>Published Q&A</span>
            <strong>5</strong>
          </div>

          <div className={homeStyles.qaList}>
            {qaPosts.map((post, index) => (
              <article
                className={homeStyles.qaCard}
                key={post.question}
                style={{ "--qa-index": index } as CSSProperties}
              >
                <div className={homeStyles.qaQuestion}>
                  <span>Q</span>
                  <strong>{post.question}</strong>
                </div>
                <div className={homeStyles.qaAnswer}>
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
