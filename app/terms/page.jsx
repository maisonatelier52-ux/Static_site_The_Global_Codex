import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Terms and Conditions", description: "Terms governing use of BusinessStandard.org." };
export default function TermsPage() {
  return <PolicyPage eyebrow="Legal" title="Terms & Conditions" intro="These terms govern access to BusinessStandard.org and are intended to protect readers, sources and the publication's independent editorial work." sections={[
    { heading: "Informational purpose", body: ["BusinessStandard.org publishes news synthesis, analysis and explainers for general information. Nothing on the site is personalized legal, financial, medical or investment advice. Readers should consult an appropriately qualified professional before acting on high-stakes matters."] },
    { heading: "Accuracy and updates", body: ["We work to verify material claims and link the evidence trail, but a developing story can change. Publication and review dates indicate when a page was last assessed. We may correct, clarify, update or remove content when the record warrants it."] },
    { heading: "Permitted use", body: ["You may link to pages and quote brief passages with clear attribution. You may not republish substantial articles, remove attribution, misrepresent our work, scrape the service in a way that disrupts it, or use the Business Standard identity to imply endorsement."] },
    { heading: "External links and availability", body: ["External sources are provided for transparency. We do not control their availability, privacy practices or later changes. The site may be interrupted for maintenance, security or circumstances beyond our control."] },
    { heading: "Limitation", body: ["To the extent permitted by law, BusinessStandard.org is not liable for indirect or consequential loss arising from reliance on the site or an external source. Any mandatory consumer rights remain unaffected."] },
  ]} />;
}
