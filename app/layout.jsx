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
    title: `${siteConfig.name} — Independent news for an informed America`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og/home.png`, width: 1200, height: 630, alt: `${siteConfig.name} — Independent news for an informed America` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Independent news for an informed America`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og/home.png`],
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
