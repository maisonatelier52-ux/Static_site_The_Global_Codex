
import Link from "next/link";
import { BreakingTicker } from "@/components/BreakingTicker";
import { Newsletter } from "@/components/Newsletter";
import { StoryCard } from "@/components/StoryCard";
import { articles, authors, categoryLabel, formatDate } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: `${siteConfig.name} — Latest U.S. and World News`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

const hero = articles.slice(0, 6);
const spotlight = articles.slice(6, 13);
const latest = articles.slice(13, 18);
const splitLeads = articles.slice(18, 20);
const advertisement = articles[20];
const columnLeads = articles.slice(21, 24);
const technology = articles.filter((article) => article.category === "technology").slice(0, 4);
const investigationFeature = articles.find((article) => article.category === "investigation");
const moreStories = articles.slice(29, 41);
const worldStories = articles.filter((article) => article.category === "world").slice(1, 4);

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";



function SectionHeading({ children, action }) {
  return (
    <div className="flex items-end max-[480px]:items-center justify-between gap-[12px] mb-[16px] pb-[8px] border-b-2 border-[#171515] [&_h2]:m-0 [&_h2]:font-bold [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[18px] [&_h2]:uppercase [&_h2]:tracking-[.04em] [&>a]:text-[#6f6966] [&>span]:text-[#6f6966] [&>a]:text-[11px] [&>span]:text-[11px] [&>a]:uppercase [&>span]:uppercase [&>a]:tracking-[.1em] [&>span]:tracking-[.1em]">
      {children}
      {action}
    </div>
  );
}

function TextList({ items }) {
  return (
    <div>
      {items.map((article) => (
        <Link
          key={article.id}
          href={`/${article.category}/${article.slug}`}
          className="block py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
        >
          <strong className={`block font-bold ${SERIF} text-[16px] leading-[1.3]`}>{article.title}</strong>
           <span className="block mt-[6px] text-gray-600 text-[12px] font-medium">{article.summary}</span>
          <span className="block mt-[6px] text-[#958d89] text-[11px] uppercase">{formatDate(article.publishedAt)}</span>
        </Link>
      ))}
    </div>
  );
}

function TextListNoSummary({ items }) {
  return (
    <div>
      {items.map((article) => (
        <Link
          key={article.id}
          href={`/${article.category}/${article.slug}`}
          className="block py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
        >
          <strong className={`block font-bold ${SERIF} text-[16px] leading-[1.3]`}>{article.title}</strong>
          <span className="block mt-[6px] text-[#958d89] text-[11px] uppercase">{formatDate(article.publishedAt)}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <div className={SHELL}>
        <BreakingTicker articles={articles.slice(0, 5)} />
      </div>

      <section className={`${SHELL} grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(150px,.55fr))] max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 gap-[1px] bg-[#d9d3ca] border border-[#d9d3ca] mt-[22px]`} aria-labelledby="news-standard">
        <div className="bg-[#10263b] text-white p-[26px] max-[640px]:p-[22px]">
          <span className="text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.2em]">The Business Standard</span>
          <h1 id="news-standard" className={`${SERIF} text-[clamp(28px,3.5vw,47px)] leading-[.96] tracking-[-.025em] mt-[12px] mb-[14px]`}>Read the evidence.<br />Understand the context.<br />Form your view.</h1>
          <p className="m-0 max-w-[540px] text-[#cbd4da] text-[13px] leading-[1.6]">Every story links its source material, separates analysis from established facts and shows when it was last reviewed.</p>
        </div>
        {[
          { n: "90", t: "stories reviewed", d: "Every story has named sources and a visible review note." },
          { n: "36", t: "evidence guides", d: "Explainers provide durable context and practical reading frameworks." },
          { n: "54", t: "news analyses", d: "Current stories synthesize public records and reputable coverage." },
        ].map((item) => (
          <article key={item.t} className="bg-[#f8f4ed] p-[22px] flex flex-col justify-between min-h-[190px]">
            <strong className={`${SERIF} text-[44px] leading-none text-[#7a1f2b]`}>{item.n}</strong>
            <span>
              <b className="block text-[11px] uppercase tracking-[.12em] text-[#10263b]">{item.t}</b>
              <small className="block mt-[8px] text-[#6f6966] text-[12px] leading-[1.5]">{item.d}</small>
            </span>
          </article>
        ))}
      </section>

      <section className={`${SHELL} grid grid-cols-[minmax(0,2.45fr)_minmax(260px,.9fr)] max-[1100px]:grid-cols-1 gap-[26px] py-[28px] border-b border-[#ded8d1]`} aria-labelledby="top-stories-heading">
        <h2 id="top-stories-heading" className="sr-only">Featured posts</h2>
        <div className="grid grid-cols-2 max-[780px]:grid-cols-1 gap-[22px]">
          {hero.slice(0, 2).map((article, index) => (
            <StoryCard key={article.id} article={article} variant="lead" priority={index === 0} />
          ))}
        </div>
        <div className="grid gap-[12px] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1">
          {hero.slice(2).map((article) => <StoryCard key={article.id} article={article} variant="horizontal" />)}
        </div>
      </section>

      {/* section 2 */}

      <section className={`${SHELL} grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] max-[780px]:grid-cols-1 gap-[26px] py-[26px] border-b border-[#ded8d1]`} aria-labelledby="spotlight-heading">
        <h2 id="spotlight-heading" className="sr-only">Editor&apos;s spotlight</h2>
        <StoryCard article={spotlight[0]} variant="overlay" />
        <div className="grid grid-cols-3 max-[780px]:grid-cols-2 gap-[22px_18px] content-start">
          {spotlight.slice(1).map((article) => <StoryCard key={article.id} article={article} variant="mini" />)}
        </div>
      </section>

      {/* section 3 */}

      <section className={`${SHELL} grid grid-cols-[1.35fr_1fr_1fr_.9fr] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[24px] py-[28px] border-b border-[#ded8d1]`}>
        {/* Latest posts */}
        <div>
          <SectionHeading action={<Link href="/world">View all</Link>}>
            <h2>Latest posts</h2>
          </SectionHeading>

          <div className="grid gap-[13px]">
            {latest.map((article) => (
              <StoryCard
                key={article.id}
                article={article}
                variant="horizontal"
              />
            ))}
          </div>
        </div>

        {/* World */}
        <div>
          <SectionHeading>
            <h2>World</h2>
          </SectionHeading>

          <TextList items={worldStories} />
        </div>

        {/* Politics */}
        <div>
          <SectionHeading>
            <h2>Politics</h2>
          </SectionHeading>

          <TextList
            items={articles
              .filter((article) => article.category === "politics")
              .slice(1, 5)}
          />
        </div>

        {/* Popular posts - Sticky Sidebar */}
        <div className="sticky top-[24px] self-start">
          <SectionHeading>
            <h2>Popular posts</h2>
          </SectionHeading>

          <div>
            {articles.slice(0, 5).map((article, index) => (
              <Link
                key={article.id}
                href={`/${article.category}/${article.slug}`}
                className="grid grid-cols-[42px_1fr] gap-[10px] items-start py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
              >
                <span
                  className={`text-[#71151f] ${SERIF} text-[30px] leading-none`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong
                  className={`font-bold ${SERIF} text-[15px] leading-[1.3]`}
                >
                  {article.title}
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

          {/* section 4 */}
      <section className={`${SHELL} grid grid-cols-[1fr_1fr_260px] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[26px] py-[28px] border-b border-[#ded8d1]`}>
        {splitLeads.map((lead) => (
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(160px,.75fr)] max-[1100px]:block gap-x-[20px] [&>div:first-child]:col-span-2" key={lead.id}>
            <SectionHeading><h2>{categoryLabel(lead.category)}</h2></SectionHeading>
            <StoryCard article={lead} variant="default" />
            <div className="max-[1100px]:mt-[12px]">
              <TextListNoSummary items={articles.filter((article) => article.category === lead.category && article.id !== lead.id).slice(0, 4)} />
            </div>
          </div>
        ))}
        <Link
          className="relative min-h-[400px] max-[1100px]:col-span-2 max-[1100px]:min-h-[270px] max-[780px]:col-span-1 overflow-hidden text-white bg-[#101c27] block [&>img]:absolute [&>img]:inset-0 [&>img]:h-full [&>img]:object-cover [&>img]:[filter:saturate(.45)_brightness(.42)] [&>span]:absolute [&>span]:-top-[16px] [&>span]:w-full [&>span]:text-[#777] [&>span]:text-center [&>span]:text-[7px] [&>span]:uppercase [&>span]:tracking-[.16em] [&>div]:absolute [&>div]:inset-0 [&>div]:flex [&>div]:flex-col [&>div]:justify-center [&>div]:p-[26px] [&>div]:border-[8px] [&>div]:border-white/8"
          href="/about"
          aria-label="Learn about BusinessStandard.org"
        >
          <img src={advertisement.image} alt="Editorial illustration used as a background for the blog approach panel" loading="lazy" />
          <span>About this publication</span>
          <div>
            <small className="tracking-[.28em]">OUR APPROACH</small>
            <strong className={`${SERIF} text-[38px] leading-none mt-[12px] mb-[28px]`}>Ideas deserve evidence.</strong>
            <b className="self-start border border-white px-[12px] py-[9px] text-[9px] uppercase tracking-[.1em] font-normal">Read how we work</b>
          </div>
        </Link>
      </section>

      {/* section 5 */}
      <section className={`${SHELL} grid grid-cols-3 max-[780px]:grid-cols-1 gap-[28px] max-[1100px]:gap-[20px] py-[30px]`}>
        {columnLeads.map((lead) => (
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(145px,.8fr)] max-[1100px]:block gap-x-[18px] [&>div:first-child]:col-span-2" key={lead.id}>
            <SectionHeading><h2>{categoryLabel(lead.category)}</h2></SectionHeading>
            <StoryCard article={lead} variant="default" />
            <div className="max-[1100px]:mt-[12px]">
              <TextListNoSummary items={articles.filter((article) => article.category === lead.category && article.id !== lead.id).slice(0, 4)} />
            </div>
          </div>
        ))}
      </section>

      {/* section 6 */}
      <div className={`${SHELL} pt-[8px] pb-[30px]`}><Newsletter /></div>

      {/* section 7 */}
        <section
          className={`${SHELL} grid grid-cols-[1.2fr_.8fr_1fr] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[28px] py-[28px] border-b border-[#ded8d1]`}
        >
          {/* Technology - Sticky */}
          <div className="sticky top-[24px] self-start max-[780px]:static">
            <SectionHeading>
              <h2>Technology</h2>
            </SectionHeading>

            <div className="grid grid-cols-2 gap-[16px]">
              {technology.map((article) => (
                <StoryCard
                  key={article.id}
                  article={article}
                  variant="mini"
                />
              ))}
            </div>
          </div>

          {/* Opinion - Sticky */}
          <div className="sticky top-[24px] self-start max-[780px]:static">
            <SectionHeading>
              <h2>Commentary</h2>
            </SectionHeading>

            {authors.slice(0, 5).map((author, index) => {
              const authorArticles = articles.filter(
                (item) => item.authorSlug === author.slug
              );

              const article =
                authorArticles.length > 0
                  ? authorArticles[index % authorArticles.length]
                  : null;

              return (
                <Link
                  className="grid grid-cols-[50px_1fr] gap-[12px] items-center py-[9px] border-b border-[#ded8d1] [&_strong]:hover:text-[#71151f]"
                  href={`/author/${author.slug}`}
                  key={author.slug}
                >
                  <span className="block w-[50px] h-[50px] rounded-full overflow-hidden bg-[#f4ecdc] ring-1 ring-[#d9d3ca]">
                    <img
                      src={author.image}
                      alt={`${author.name} editorial emblem`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </span>

                  <span>
                    <strong
                      className={`block font-bold ${SERIF} text-[15px] leading-[1.25]`}
                    >
                      {article?.title || author.beat}
                    </strong>

                    <small className="block mt-[4px] text-[#6f6966] text-[10px] uppercase">
                      Edited by {author.name}
                    </small>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Investigation - Controls the sticky area height */}
          <div className="max-[1100px]:col-span-2 max-[780px]:col-span-1">
            <SectionHeading>
              <h2>Investigation</h2>
            </SectionHeading>

            <StoryCard
              article={investigationFeature}
              variant="lead"
            />

            <TextList
              items={articles
                .filter(
                  (article) =>
                    article.category === "investigation" &&
                    article.id !== investigationFeature.id
                )
                .slice(0, 4)}
            />
          </div>
        </section>

      <section className={`${SHELL} py-[30px] pb-[46px]`}>
        <SectionHeading><h2>More from Business Standard</h2></SectionHeading>
        <div className="grid grid-cols-6 max-[1100px]:grid-cols-4 max-[780px]:grid-cols-1 gap-[22px_16px]">
          {moreStories.map((article) => (
            <div
              key={article.id}
              className="max-[780px]:[&>article]:grid max-[780px]:[&>article]:grid-cols-[115px_1fr] max-[780px]:[&>article]:gap-[12px] max-[780px]:[&>article]:items-start [&_h3]:text-[15px]"
            >
              <StoryCard article={article} variant="mini" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
