import Link from "next/link";
import { siteConfig } from "@/lib/site";

const SHELL = "w-[min(900px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,900px)] mx-auto";

export function PolicyPage({ eyebrow, title, intro, sections, updated = "September 4, 2026" }) {
  return (
    <main id="main-content">
      <header className="bg-[#101c27] text-white py-[58px]">
        <div className={SHELL}>
          <nav className="text-[#9ca6ae] text-[13px] mb-[22px]" aria-label="Breadcrumb"><Link href="/">Home</Link> / {title}</nav>
          <span className="text-[#d8a9ae] text-[11px] font-bold tracking-[.16em] uppercase">{eyebrow}</span>
          <h1 className="font-['Georgia','Times_New_Roman',serif] text-[clamp(38px,7vw,70px)] leading-[.95] mt-[10px] mb-[18px]">{title}</h1>
          <p className="max-w-[720px] text-[#c6cdd1] font-['Georgia','Times_New_Roman',serif] text-[18px] leading-[1.6]">{intro}</p>
        </div>
      </header>
      <article className={`${SHELL} py-[54px]`}>
        <p className="text-[#6f6966] text-[13px] border-b border-[#ded8d1] pb-[18px]">Applies to {siteConfig.url} · Last updated {updated}</p>
        {sections.map(({ heading, body }) => (
          <section key={heading} className="py-[20px] border-b border-[#ded8d1]">
            <h2 className="font-['Georgia','Times_New_Roman',serif] text-[26px] mb-[10px]">{heading}</h2>
            {body.map((paragraph) => <p key={paragraph} className="text-[#4f4a46] text-[16px] leading-[1.75] mb-[12px]">{paragraph}</p>)}
          </section>
        ))}
        <p className="mt-[30px] text-[15px]">Questions may be sent to <a className="text-[#71151f] underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
      </article>
    </main>
  );
}
