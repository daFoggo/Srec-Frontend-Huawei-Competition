"use client";
import { motion } from "framer-motion";
import { candidate, personalityTest } from "./constant";
import StatisticBlock from "@/components/StatisticBlock/StatisticBlock";
import { GitCompare, Terminal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CandidateProfileDialog from "@/components/CandidateProfileDialog/CandidateProfileDialog";
import ReuseDonutChart from "@/components/ReuseDonutChart/ReuseDonutChart";
const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="p-6 flex flex-col">
      <motion.div
        className="p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col gap-6" variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <motion.h1
              className="font-clash font-semibold text-3xl text-rocken-blue-500"
              variants={itemVariants}
            >
              Summary of assessments
            </motion.h1>
          </motion.div>

          {/* Candidate profile */}
          <div className="w-full border shadow-sm rounded-lg p-6 flex justify-between font-inter">
            <div className="flex gap-2 items-center">
              <Avatar className="cursor-pointer">
                <AvatarFallback className="font-clash font-semibold">
                  {candidate.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="font-semibold">
                <p className="">{candidate.name}</p>
                <p className="text-xs text-rocken-subtle">{candidate.email}</p>
              </div>
            </div>

            <div className="flex gap-4 font-semibold text-sm">
              <div className="flex flex-row gap-1 items-center">
                <p className="text-rocken-subtle">Major</p>
                <Badge className="bg-rocken-blue-200 border-rocken-blue-500 text-rocken-blue-500 hover:bg-rocken-blue-200/90 hover:border-rocken-blue-500/90 hover:text-rocken-blue-500/90 transition-colors">
                  {candidate.major}
                </Badge>
              </div>

              <div className="flex flex-row gap-1 items-center">
                <p className="text-rocken-subtle">Age</p>
                <p className="">{candidate.age}</p>
              </div>

              <CandidateProfileDialog
                candidate={candidate}
                isColumnItem={false}
              />
            </div>
          </div>

          {/* Assessment result */}
          <motion.div
            variants={itemVariants}
            className="bg-rocken-ground shadow-sm rounded-lg border p-6 font-inter"
          >
            <div className="flex gap-6">
              <div className="flex flex-col justify-between gap-6 h-auto">
                <StatisticBlock
                  icon={<GitCompare className="text-rocken-blue-500" />}
                  title="Matching scores"
                  value="0.9"
                />
                <StatisticBlock
                  icon={<Terminal className="text-violet-400" />}
                  title="Code assessments"
                  value="2/3"
                />
              </div>

              <div className="flex items-center justify-center">
                <ReuseDonutChart
                  data={personalityTest}
                  title="Personality Test"
                  description="Five traits of personality"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
