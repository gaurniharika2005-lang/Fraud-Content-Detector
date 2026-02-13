import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, KeyRound } from "lucide-react";

export default function CredentialGuard() {
  const handleScan = async (input: string) => {
    // Mock Logic
    const isLeaked = input.includes("@");
    
    return {
      risk: isLeaked ? "high" : "low",
      score: isLeaked ? 100 : 0,
      icon: isLeaked ? AlertTriangle : KeyRound,
      summary: isLeaked 
        ? "CRITICAL: Credentials found in 4 known dark web breaches. This account is compromised."
        : "No breaches found for this identifier in our database.",
      details: [
        { label: "Total Breaches", value: isLeaked ? "4" : "0" },
        { label: "Last Seen", value: isLeaked ? "2024-02-10" : "N/A" },
        { label: "Data Exposed", value: isLeaked ? "Password, IP, Phone" : "None" },
        { label: "Source", value: isLeaked ? "Collection #1" : "N/A" },
      ],
      actions: isLeaked 
        ? ["Force password reset", "Enable MFA immediately", "Revoke active sessions"]
        : ["Monitor account"]
    };
  };

  return (
    <Layout>
      <ScannerInterface
        title="Credential Guard"
        description="Check if user credentials have been exposed in known data breaches or dark web dumps."
        inputType="text"
        placeholder="Enter email or username..."
        onScan={handleScan}
      />
    </Layout>
  );
}
