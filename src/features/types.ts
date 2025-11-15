export interface JobDetails {
  success_records: number;
  error_records: number;
  credits_used: number;
}

export interface Job {
  job_id: string;
  status: "Success" | "Failed" | "Running" | "Queued";
  input_type: "PDF" | "CSV" | "XML" | "JSON" | "DOCX";
  start_timestamp: string;
  duration_ms: number;
  details: JobDetails;
}

export interface JobsFilterState {
  status: string;    
  input_type: string;
  search: string;     
  page: number;
  page_size: number;
}
