import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "@/features/jobs-slice";
import type { Job } from "@/features/types";
import { toast } from "sonner";
import { validateForm } from "@/utils/validate-form";

const CreateJobModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const initialForm = {
    job_id: "",
    status: "" as Job["status"],
    input_type: "" as Job["input_type"],
    start_timestamp: "",
    duration_ms: "",
    success_records: "",
    error_records: "",
    credits_used: "",
  };

  const [form, setForm] = useState(initialForm);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm(form);
    if (error) {
      toast.error(error);
      return;
    }

    const job: Job = {
      job_id: form.job_id,
      status: form.status,
      input_type: form.input_type,
      start_timestamp: form.start_timestamp,
      duration_ms: Number(form.duration_ms),
      details: {
        success_records: Number(form.success_records),
        error_records: Number(form.error_records),
        credits_used: Number(form.credits_used),
      },
    };

    dispatch(addJob(job));
    toast.success(`Job with ID ${job.job_id} created successfully!`);
    setForm(initialForm);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Job
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Job ID"
            value={form.job_id}
            onChange={(e) => updateField("job_id", e.target.value)}
          />

          <Input
            placeholder="Status"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          />

          <Input
            placeholder="Input Type"
            value={form.input_type}
            onChange={(e) => updateField("input_type", e.target.value)}
          />

          <Input
            placeholder="Start Timestamp"
            value={form.start_timestamp}
            onChange={(e) => updateField("start_timestamp", e.target.value)}
          />

          <Input
            placeholder="Duration (ms)"
            value={form.duration_ms}
            onChange={(e) => updateField("duration_ms", e.target.value)}
          />

          <Input
            placeholder="Success Records"
            value={form.success_records}
            onChange={(e) => updateField("success_records", e.target.value)}
          />

          <Input
            placeholder="Error Records"
            value={form.error_records}
            onChange={(e) => updateField("error_records", e.target.value)}
          />

          <Input
            placeholder="Credits Used"
            value={form.credits_used}
            onChange={(e) => updateField("credits_used", e.target.value)}
          />

          <Button type="submit" className="w-full">
            Create Job
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
