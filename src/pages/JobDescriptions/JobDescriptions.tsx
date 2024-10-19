import { jobDescriptions } from "./constant";
import { useEffect, useState } from "react";
import { IJobDescription } from "@/models/JobDescriptions/JobDescriptions";
import { JobDescriptionsColumn } from "@/models/JobDescriptions/JobDescriptionsColumn";
import axios from "axios";
import { toast } from "sonner";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { DataTable } from "@/components/ui/data-table";

const JobDescriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescriptionData, setJobDescriptionData] =
    useState<IJobDescription[]>(jobDescriptions);

  const getJobDescriptions = async () => {
    setIsLoading(true);
    try {
      toast.success("Job descriptions loaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job descriptions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  return (
    <div className="p-6 font-inter">
      {isLoading && <LoadingOverlay isLoading={isLoading} />}
      <h1 className="font-semibold font-clash text-3xl">Job descriptions</h1>
      <DataTable columns={JobDescriptionsColumn} data={jobDescriptionData} />
    </div>
  );
};

export default JobDescriptions;
