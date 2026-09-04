import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Contact", description: "Contact the BusinessStandard.org editorial team." };
export default function ContactPage() {
  return <PolicyPage eyebrow="Contact" title="Contact Business Standard" intro="For corrections, source documents, rights questions or general editorial correspondence, email editor@businessstandard.org." sections={[
    { heading: "Corrections and tips", body: ["For a correction, include the page URL, the exact passage and evidence supporting the requested change. For a news tip, explain why it matters to U.S. readers and provide public records when available."] },
    { heading: "Rights and permissions", body: ["For republication or image questions, identify the article and proposed use. A link to the site does not require permission, but substantial reproduction does."] },
    { heading: "Security", body: ["Ordinary email is not a secure channel for highly sensitive material. Do not send passwords, financial account information, medical records or confidential legal documents."] },
  ]} />;
}
