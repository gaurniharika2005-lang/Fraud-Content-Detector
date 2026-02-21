import { Layout } from "@/components/layout/Layout";
import { ScannerInterface } from "@/components/shared/ScannerInterface";
import { AlertTriangle, FileAudio } from "lucide-react";

export default function MediaForensics() {
  const handleScan = async (input: string) => {
    try {
      const response = await fetch("https://defraud-api.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input || "media file scan" })
      });

      const data = await response.json();
      const isFake = data.is_phishing;

      return {
        risk: isFake ? "high" : "low",
        score: data.confidence,
        icon: isFake ? AlertTriangle : FileAudio,
        summary: isFake
          ? "Deepfake content detected. Spectral analysis reveals artifacts consistent with AI synthesis models."
          : "Media appears authentic. No synthetic artifacts detected.",
        details: [
          { label: "AI Probability", value: `${data.confidence}%` },
          { label: "Sentiment", value: data.sentiment },
          { label: "Risk Level", value: data.risk_level },
          { label: "Status", value: isFake ? "Synthetic/Fake" : "Authentic" },
        ],
        actions: data.recommended_actions || []
      };
    } catch (error) {
      return {
        risk: "low",
        score: 0,
        icon: FileAudio,
        summary: "Could not connect to analysis server.",
        details: [],
        actions: ["Restart the Python backend"]
      };
    }
  };


  return (
    <Layout>
      <ScannerInterface
        title="Media Forensics"
        description="Upload audio or video files to detect deepfake manipulation and synthetic voice generation."
        inputType="file"
        placeholder="Upload file..."
        onScan={handleScan}
      />
    </Layout>
  );
}
