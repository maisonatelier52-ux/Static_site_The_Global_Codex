import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Corrections Policy", description: "How BusinessStandard.org handles corrections and updates." };
export default function CorrectionsPage() {
  return <PolicyPage eyebrow="Accountability" title="Corrections Policy" intro="Accuracy is a continuing obligation. We correct the public record clearly and preserve enough context for readers to understand the change." sections={[
    { heading: "How to report an error", body: ["Send the article URL, the statement at issue and any supporting public document to editor@businessstandard.org. We review specific, evidence-based requests regardless of the sender's viewpoint."] },
    { heading: "What happens next", body: ["The editor checks the cited source, the article's evidence trail and relevant new information. We may contact the requester for clarification. A material factual error is corrected promptly after verification."] },
    { heading: "How changes are labeled", body: ["Substantive corrections include a dated note describing the original problem and the corrected information. Developing-story updates are marked by the review date. Clarifications explain wording that was accurate but materially incomplete or ambiguous."] },
  ]} />;
}
