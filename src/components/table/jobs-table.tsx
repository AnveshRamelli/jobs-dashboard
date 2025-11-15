import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { selectPaginatedJobs, selectFilters, selectTotalPages } from "@/features/jobs-selectors";
import { setInputTypeFilter, setPage,  setStatusFilter } from "@/features/jobs-slice";
import SearchContainer from "../search-container";



const JobTable: React.FC = () => {
  const dispatch = useDispatch();

  const jobs = useSelector(selectPaginatedJobs);
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPages);

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* FILTERS */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <SearchContainer />

        <div className="flex gap-3">
          <Select
            value={filters.status}
            onValueChange={(v) => dispatch(setStatusFilter(v))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Running">Running</SelectItem>
              <SelectItem value="Queued">Queued</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.input_type}
            onValueChange={(v) => dispatch(setInputTypeFilter(v))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Input Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="CSV">CSV</SelectItem>
              <SelectItem value="XML">XML</SelectItem>
              <SelectItem value="JSON">JSON</SelectItem>
              <SelectItem value="DOCX">DOCX</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Page {filters.page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={filters.page <= 1}
            onClick={() => dispatch(setPage(filters.page - 1))}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={filters.page >= totalPages}
            onClick={() => dispatch(setPage(filters.page + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
