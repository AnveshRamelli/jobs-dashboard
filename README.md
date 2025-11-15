# Job Manager Dashboard

A dashboard to manage data processing jobs with CSV upload and a job table. Provides a clean UI, job creation modal, and CSV uploader with progress simulation.

Check out the live version here: [View Live Dashboard](https://jobs-dashboard-beta.vercel.app/)

---

## **Tech Stack**

- **Frontend:** React, Tailwind CSS  
- **State Management:** Redux Toolkit  
- **UI libraries:** shadcn/ui, Lucide Icons, react-table  
- **Notifications:** Sonner  
- **CSV Parsing:** Custom `parseCsvToJson` utility using `papaparse` library
- **Form Validation:** Custom function

---

## **Project Structure**

- **`Main` Component:** Main dashboard layout  
  - sidebar (static for now)
  - Shows either the job table or CSV uploader depending on data availability  
  - Includes "Create Job" modal when jobs exist
- **`CreateJobModal`:**  
  - Allows creating a new job with validation  
- **`CsvUploader`:**  
  - Upload CSV files to populate jobs  
  - Shows a progress bar while "uploading"  
  - Updates Redux store with parsed JSON  
- **`JobsTable`:** Displays jobs in a table with search functionality and filters

---

## **Features**

- **Job Management:** Add new jobs through a modal with validation  
- **CSV Upload:** Parse CSV and populate jobs dynamically  
- **Progress UI:** Simulated progress bar for CSV upload  
- **Notifications:** Success/error feedback using toast notifications

---

## **Future work**

- **Form validation:** Use Zod for schema validation
- **Sorting:** Add sorting based on timestamp or other fields

---

## **How to Run**

```bash
# Install dependencies
npm install

# Run development server
npm run dev
