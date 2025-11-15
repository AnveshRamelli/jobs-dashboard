import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
import { setJobs } from "@/features/jobs-slice";
import { parseCsvToJson } from "@/utils/parse-csv";
import { toast } from "sonner";
import AnimatedProgress from "./progress";

const CsvUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const delayMs = 1000; // Duration for the progress bar animation

  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      toast.error("Please upload a valid CSV file.");
      return;
    }
    setLoading(true);
    try {
      const json = await parseCsvToJson(file);
      setTimeout(() => {
        dispatch(setJobs(json));
        setLoading(false);
        toast.success("CSV file uploaded successfully!");
      }, delayMs);
    } catch (err) {
      console.error("CSV Parse Error:", err);
      toast.error("Failed to parse CSV file.");
    }
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm flex justify-center items-center h-48 mt-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
              {/* Visible button */}
      <Button onClick={handleButtonClick} disabled={loading}>
        <UploadCloud className="w-4 h-4" />
        Upload CSV
      </Button>

      {/* Progress bar */}
      {loading && <AnimatedProgress duration={delayMs} />}
      </div>
    </div>
  );
};

export default CsvUploader;
