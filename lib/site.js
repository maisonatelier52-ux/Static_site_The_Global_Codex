export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Business Standard",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "BS",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Independent news for an informed America.",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "BusinessStandard.org delivers sourced, independent U.S.-focused news and analysis across world affairs, politics, business, finance, technology, health, sport and investigations.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.businessstandard.org").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "editor@businessstandard.org",
  social: {
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/",
  },
};

export const navCategories = [
  "World",
  "U.S",
  "Business",
  "Finance",
  "Technology",
  "Politics",
  "Health",
  "Sport",
  "Investigation",
];
