import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "@/features/jobs-slice";

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
  },devTools: true
});

export type RootState = ReturnType<typeof store.getState>;