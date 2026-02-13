import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, Globe } from "lucide-react";

export default function WebScanner() {
  const handleScan = async (input: string) => {
    // Mock Logic
    const isMalicious = input.includes("login") || input.includes("secure") || input.length > 30;
    
    return {
      risk: isMalicious ? "medium" : "low",
      score: isMalicious ? 75 : 5,
      icon: isMalicious ? AlertTriangle : Globe,
      summary: isMalicious 
        ? "Suspicious website structure detected. The domain uses homograph spoofing techniques and lacks valid SSL certification from a trusted authority."
        : "Website appears legitimate. SSL certificate is valid and domain reputation is clean.",
      details: [
        { label: "Domain Age", value: isMalicious ? "2 Days" : "5 Years" },
        { label: "SSL Issuer", value: isMalicious ? "Untrusted / Self-signed" : "DigiCert Inc" },
        { label: "IP Reputation", value: isMalicious ? "Blacklisted" : "Clean" },
        { label: "Spoofing Type", value: isMalicious ? "Homograph Attack" : "None" },
      ],
      actions: isMalicious 
        ? ["Block access via firewall", "Report to registrar", "Scan for downloaded cookies"]
        : ["Allow access"]
    };
  };

  return (
    <Layout>
      <ScannerInterface
        title="Web Scanner"
        description="Analyze URLs for spoofing, phishing kits, and malicious cookies."
        inputType="url"
        placeholder="https://example.com"
        onScan={handleScan}
      />
    </Layout>
  );
}
