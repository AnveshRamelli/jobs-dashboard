import { type ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { Job } from "@/features/types";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "job_id",
    header: "Job ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "input_type",
    header: "Input Type",
  },
  {
    accessorKey: "start_timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
    const ts = row.original.start_timestamp; 
    const formatedDateTime = new Date(ts).toLocaleString();
    return <span>{formatedDateTime}</span>;
  },
  },
  {
    accessorKey: "duration_ms",
    header: "Duration (ms)",
  },

  {
    id: "details",
    header: "",
    cell: ({ row }) => {
      const d = row.original.details;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 cursor-pointer text-gray-600" />
            </TooltipTrigger>
            <TooltipContent className="text-xs bg-primary">
              <p>Success records: {d.success_records}</p>
              <p>Error records: {d.error_records}</p>
              <p>Credits Used: {d.credits_used}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
