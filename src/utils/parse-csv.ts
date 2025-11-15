import Papa from "papaparse";

export const parseCsvToJson = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.map((row: any) => {
          let parsedDetails = row.details;
          try {
            if (typeof row.details === "string") {
              parsedDetails = JSON.parse(row.details);
            }
          } catch {
            console.warn("Invalid details JSON:", row.details);
            parsedDetails = {};
          }

          return {
            ...row,
            duration_ms: Number(row.duration_ms),
            details: parsedDetails,
          };
        });

        resolve(data);
      },
      error: reject,
    });
  });
};
