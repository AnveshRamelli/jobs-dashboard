import { createSelector } from "@reduxjs/toolkit";
import type { Job } from "./types";
import type { RootState } from "@/store.";

export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectFilters = (state: RootState) => state.jobs.filters;

// Searrch by Job ID
export const selectSearchedJobs = createSelector(
  [selectJobs, selectFilters],
  (jobs, filters) => {
    if (!filters.search.trim()) return jobs;

    return jobs.filter((job: Job) =>
      job.job_id.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
);

// Filter by Status and Input Type
export const selectFilteredJobs = createSelector(
  [selectSearchedJobs, selectFilters],
  (jobs, filters) => {
    return jobs.filter((job:Job) => {
      const matchStatus =
        filters.status === "all" || job.status === filters.status;

      const matchInput =
        filters.input_type === "all" || job.input_type === filters.input_type;

      return matchStatus && matchInput;
    });
  }
);

// paginated jobs
export const selectPaginatedJobs = createSelector(
  [selectFilteredJobs, selectFilters],
  (jobs, filters) => {
    const startIndex = (filters.page - 1) * filters.page_size;
    const endIndex = startIndex + filters.page_size;

    return jobs.slice(startIndex, endIndex);
  }
);

// Total Pages after Applying Search + Filters
export const selectTotalPages = createSelector(
  [selectFilteredJobs, selectFilters],
  (jobs, filters) => {
    return Math.ceil(jobs?.length / filters?.page_size);
  }
);
