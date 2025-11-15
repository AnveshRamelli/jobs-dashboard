import { useSelector } from "react-redux";
import CreateJobModal from "./create-job-modal";
import CsvUploader from "./csv-uploader";
import JobsTable from "./table/jobs-table";
import { selectJobs } from "@/features/jobs-selectors";

const Main = () => {
  const jobs = useSelector(selectJobs);
  const hasJobs = jobs.length > 0;
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Jobs</h1>
          <p className="text-sm text-gray-600">
            Manage and monitor your data processing jobs
          </p>
        </div>
        {hasJobs && <CreateJobModal/>}
      </div>
      {hasJobs ? <JobsTable /> : <CsvUploader />}
    </main>
  );
};

export default Main;
