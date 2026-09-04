import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Editorial Standards", description: "Sourcing, attribution and correction standards at BusinessStandard.org." };
export default function StandardsPage() {
  return <PolicyPage eyebrow="Trust" title="Editorial Standards" intro="Our job is to make the verified core of a story clear, attribute it honestly and show readers where uncertainty remains." sections={[
    { heading: "Verification and attribution", body: ["We prefer primary documents and named, reputable reporting. Consequential claims should be checked against more than one source when possible. Each article lists the public sources used for review and identifies the piece as synthesis unless original reporting is explicitly documented."] },
    { heading: "Original writing", body: ["Articles are independently written and structured. We do not reproduce another publisher's wording or present aggregation as firsthand reporting. Direct quotations, when necessary, must be brief, accurate and clearly attributed."] },
    { heading: "Fairness and uncertainty", body: ["We distinguish established facts, disputed claims, interpretation and prediction. People or organizations facing a serious allegation should have their relevant response represented. Headlines must not claim more than the article supports."] },
    { heading: "Images and artificial intelligence", body: ["Editorial illustrations are conceptual and labeled as such; they are not evidence that an event occurred. Automated tools may assist research, production or proofreading, but a human publisher remains responsible for verification, rights, corrections and final publication."] },
    { heading: "Conflicts and corrections", body: ["Material interests that could affect a story should be disclosed. A substantive error is corrected on the affected page with a dated note that explains what changed. Minor spelling or formatting fixes do not require a correction note."] },
  ]} />;
}
