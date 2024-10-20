import { jobDescriptions } from "./constant";
import { useEffect, useState } from "react";
import { IJobDescription } from "@/models/JobDescriptions/JobDescriptions";
import { JobDescriptionsColumn } from "@/models/JobDescriptions/JobDescriptionsColumn";
import axios from "axios";
import { toast } from "sonner";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { DataTable } from "@/components/ui/data-table";
import { motion, AnimatePresence } from "framer-motion";

const JobDescriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescriptionData, setJobDescriptionData] =
    useState<IJobDescription[]>(jobDescriptions);

  const getJobDescriptions = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="p-6 font-inter"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* <AnimatePresence>
        {isLoading && <LoadingOverlay isLoading={isLoading} />}
      </AnimatePresence> */}
      
      <motion.h1
        className="font-clash font-semibold text-3xl text-rocken-blue-500 mb-6"
        variants={itemVariants}
      >
        Job Descriptions
      </motion.h1>

      <motion.div variants={itemVariants}>
        <DataTable columns={JobDescriptionsColumn} data={jobDescriptionData} />
      </motion.div>
    </motion.div>
  );
};

export default JobDescriptions;