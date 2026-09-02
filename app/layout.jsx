import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — Evidence. Context. Consequence.`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.png`, width: 1731, height: 909, alt: `${siteConfig.name} — Evidence. Context. Consequence.` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Evidence. Context. Consequence.`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <a
          className="fixed left-[12px] -top-[60px] z-[999] bg-[#171515] text-white px-[18px] py-[12px] focus:top-[12px]"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header
          searchItems={articles.map(({ title, summary, category, slug }) => ({
            title,
            summary,
            category,
            slug,
          }))}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
