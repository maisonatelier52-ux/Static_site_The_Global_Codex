import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Privacy Policy", description: "Privacy practices for BusinessStandard.org." };
export default function PrivacyPage() {
  return <PolicyPage eyebrow="Legal" title="Privacy Policy" intro="BusinessStandard.org is designed to collect as little personal information as practical while explaining clearly what may be processed when you visit." sections={[
    { heading: "Information we process", body: ["The published site does not require an account. Standard hosting logs may include an IP address, browser type, requested page, time and security events. These records are used to operate, protect and diagnose the service.", "If you contact us, we receive the address and information you choose to provide. Do not send confidential, medical, legal or financial records through ordinary email."] },
    { heading: "Cookies and analytics", body: ["The current build does not set advertising cookies or include behavioral advertising. A future analytics service must be documented here before deployment and configured to minimize collection."] },
    { heading: "Sharing and retention", body: ["We do not sell personal information. Hosting and security providers may process limited technical data on our behalf. Logs and correspondence should be retained only as long as operational, legal or security needs require."] },
    { heading: "Your choices", body: ["You may ask about information supplied directly to us or request its correction or deletion, subject to legal and recordkeeping obligations. Privacy requests should identify the relevant correspondence without including unnecessary sensitive details."] },
  ]} />;
}
