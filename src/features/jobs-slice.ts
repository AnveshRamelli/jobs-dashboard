import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job, JobsFilterState } from "./types";
import { toast } from "sonner";

const initialJobs:Job[] = [];

const initialFilters: JobsFilterState = {
  status: "all",
  input_type: "all",
  search: "",
  page: 1,
  page_size: 5,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: initialJobs,
    filters: initialFilters,
  },
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
      state.filters.page = 1;
    },

    addJob: (state, action: PayloadAction<Job>) => {
      const newJob = action.payload;
      if(state.jobs.find(job => job.job_id === newJob.job_id)){
        toast.error(`Job with ID ${newJob.job_id} already exists!`);
        return;
      }
      state.jobs.unshift(action.payload); // add newest at top
      state.filters.page = 1;
    },

    // Filters
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
      state.filters.page = 1; // reset page
    },

    setInputTypeFilter: (state, action: PayloadAction<string>) => {
      state.filters.input_type = action.payload;
      state.filters.page = 1;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },

    // Pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },

    // Reset all filters
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
  },
});


export const {
  setJobs,
  addJob,
  setStatusFilter,
  setInputTypeFilter,
  setSearch,
  setPage,
  resetFilters,
} = jobsSlice.actions;

export default jobsSlice.reducer;
