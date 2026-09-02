export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "The Global Dispatch",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "TGD",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Evidence. Context. Consequence.",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "An evidence-based global affairs blog offering sourced analysis, practical explainers and clear commentary on what matters next.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "standards@globaldispatch.example",
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
  "Politics",
  "Technology",
  "Science",
  "Sports",
  "Culture",
  "Lifestyle",
  "Opinion",
];
