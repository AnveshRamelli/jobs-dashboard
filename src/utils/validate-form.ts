import type { Job } from "@/features/types";

  const validStatuses: Job["status"][] = [
    "Success",
    "Failed",
    "Running",
    "Queued",
  ];
  const validInputTypes: Job["input_type"][] = [
    "PDF",
    "CSV",
    "XML",
    "JSON",
    "DOCX",
  ];
export const validateForm = (form: any) => {
    if (!form.job_id.trim()) return "Job ID is required";
    if (!form.status.trim()) return "Status is required";
    if (!validStatuses.includes(form.status as Job["status"]))
      return `Status must be one of: ${validStatuses.join(", ")}`;

    if (!form.input_type.trim()) return "Input Type is required";
    if (!validInputTypes.includes(form.input_type as Job["input_type"]))
      return `Input Type must be one of: ${validInputTypes.join(", ")}`;

    if (!form.start_timestamp.trim() || isNaN(Date.parse(form.start_timestamp)))
      return "Valid Start Timestamp is required";
    if (!form.duration_ms.trim() || isNaN(Number(form.duration_ms)))
      return "Duration must be a number";
    if (!form.success_records.trim() || isNaN(Number(form.success_records)))
      return "Success Records must be a number";
    if (!form.error_records.trim() || isNaN(Number(form.error_records)))
      return "Error Records must be a number";
    if (!form.credits_used.trim() || isNaN(Number(form.credits_used)))
      return "Credits Used must be a number";
    return null; // valid
  };