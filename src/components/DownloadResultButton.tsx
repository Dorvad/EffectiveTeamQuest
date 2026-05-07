import { Download } from "lucide-react";
import { useState, type RefObject } from "react";
import { downloadResultCard } from "../lib/exportImage";
import { Button } from "./ui/Button";

type DownloadResultButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
};

export function DownloadResultButton({ targetRef }: DownloadResultButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (!targetRef.current) {
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      await downloadResultCard(targetRef.current);
    } catch {
      setError("לא הצלחנו להוריד את התמונה. נסו שוב או צלמו מסך של הכרטיס.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleDownload} disabled={isExporting} fullWidth>
        <Download className="h-5 w-5" />
        {isExporting ? "מכינים תמונה..." : "הורדת כרטיס תוצאה"}
      </Button>
      {error ? <p className="text-center text-sm font-semibold text-rose-600">{error}</p> : null}
    </div>
  );
}
