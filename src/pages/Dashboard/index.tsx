"use client";
import { motion } from "framer-motion";
import {
  candidateData,
  personalityTestData,
  codeAssessmentData,
  virtualInterviewData,
} from "./constant";
import StatisticBlock from "@/components/StatisticBlock";
import {
  BadgeCheck,
  GitCompare,
  MessageCircle,
  Mic,
  Sparkles,
  Terminal,
  Video,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CandidateProfileDialog from "@/components/CandidateProfileDialog";
import ReuseDonutChart from "@/components/ReuseDonutChart";
import EmotionChart from "@/components/EmotionChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReusablePieChart from "@/components/ReusePieChart";

const Dashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
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

  const renderField = (icon: React.ReactNode, title: string, value: string) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-rocken-blue-500">{icon}</div>
          <Label className="text-base font-semibold text-rocken-blue-700">
            {title}
          </Label>
        </div>
        {value.length > 20 ? (
          <Textarea
            value={value}
            className="w-full bg-gray-50 border-gray-200 text-gray-700"
            rows={3}
            readOnly
          />
        ) : (
          <Input
            value={value}
            className="w-full bg-gray-50 border-gray-200 text-gray-700"
            readOnly
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-3 md:p-6 flex flex-col">
      <motion.div
        className="p-3 md:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col gap-4 md:gap-6"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="font-clash font-semibold text-xl md:text-3xl text-rocken-blue-500"
              variants={itemVariants}
            >
              Summary of assessments
            </motion.h1>
          </motion.div>

          {/* Candidate profile */}
          <div className="w-full border shadow-sm rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 font-inter">
            <div className="flex gap-2 items-center">
              <Avatar className="cursor-pointer w-8 h-8 md:w-10 md:h-10">
                <AvatarFallback className="font-clash font-semibold text-sm md:text-base">
                  {candidateData.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="font-semibold">
                <p className="text-sm md:text-base">{candidateData.name}</p>
                <p className="text-xs text-rocken-subtle">
                  {candidateData.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 font-semibold text-xs md:text-sm">
              <div className="flex flex-row gap-1 items-center">
                <p className="text-rocken-subtle">Major</p>
                <Badge className="bg-rocken-blue-200 border-rocken-blue-500 text-rocken-blue-500 hover:bg-rocken-blue-200/90 hover:border-rocken-blue-500/90 hover:text-rocken-blue-500/90 transition-colors">
                  {candidateData.major}
                </Badge>
              </div>

              <div className="flex flex-row gap-1 items-center">
                <p className="text-rocken-subtle">Age</p>
                <p className="">{candidateData.age}</p>
              </div>

              <CandidateProfileDialog
                candidate={candidateData}
                isColumnItem={false}
              />
            </div>
          </div>

          {/* Assessment result */}
          <motion.div
            variants={itemVariants}
            className="bg-rocken-ground shadow-sm rounded-lg border p-4 md:p-6 font-inter space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Statistics blocks */}
              <div className="md:col-span-2 grid grid-cols-2 md:flex md:flex-col justify-between h-full gap-4 md:gap-6">
                <StatisticBlock
                  icon={
                    <GitCompare className="text-rocken-blue-500 w-4 h-4 md:w-5 md:h-5" />
                  }
                  title="Matching score"
                  value={`${codeAssessmentData.overall_score}/3`}
                />
                <StatisticBlock
                  icon={
                    <Terminal className="text-violet-400 w-4 h-4 md:w-5 md:h-5" />
                  }
                  title="Code assessment"
                  value="2/3"
                />
              </div>

              {/* Personality donut chart */}
              <div className="md:col-span-3 h-full">
                <ReuseDonutChart
                  data={personalityTestData}
                  title="Personality Test"
                  description="Five traits of personality"
                />
              </div>

              {/* Emotion chart */}
              <div className="md:col-span-7 h-full">
                <EmotionChart />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="codeAssessment" className="w-full font-inter">
              <TabsList className="space-x-1">
                <TabsTrigger value="codeAssessment">
                  Code assessment
                </TabsTrigger>
                <TabsTrigger value="virtualInterview">
                  Virtual interview
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="codeAssessment"
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <h1 className="font-semibold text-2xl">Code assessment</h1>
                <div className="flex flex-col space-y-1">
                  <div className="mt-4">
                    <Label className="text-base font-semibold">
                      Overall score:{" "}
                    </Label>
                    <Badge className="bg-rocken-blue-200 border-rocken-blue-500 text-rocken-blue-500">
                      {codeAssessmentData.overall_score}/3
                    </Badge>
                  </div>
                  <Accordion type="single" collapsible>
                    {codeAssessmentData.problems.map((problem, index) => (
                      <AccordionItem value={`test-${index}`} key={index}>
                        <AccordionTrigger>Problem {index + 1}</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          {renderField(
                            <BadgeCheck />,
                            "Score",
                            problem?.problem_score.toString()
                          )}
                          {renderField(
                            <Sparkles />,
                            "Clean code score",
                            problem?.clean_code_score.toString()
                          )}
                          {renderField(
                            <MessageCircle />,
                            "Feedback",
                            problem?.feedback
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              <TabsContent
                value="virtualInterview"
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <h1 className="font-semibold text-2xl">Virtual Interview</h1>
                <div className="flex flex-col sm:flex-row gap-6 mt-4">
                  {/* Emotion pie chart */}
                  <ReusablePieChart
                    data={virtualInterviewData.emotion_overview}
                    title="Emotion Overview"
                    description="Candidate's emotional state"
                    leftFooterText="Most of the time candidate felt"
                  />
                  {/* Fluency chart*/}
                  <ReusablePieChart
                    data={virtualInterviewData.fluency_prediction}
                    title="Fluency analysis"
                    description="Candidate's language fluency"
                    leftFooterText="Candidate has a"
                    rightFooterText="proficiency in English"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Accordion type="single" collapsible>
                    {virtualInterviewData?.interview_answers.map(
                      (question, index) => (
                        <AccordionItem value={`question-${index}`} key={index}>
                          <AccordionTrigger>
                            Question {index + 1}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            {renderField(
                              <MessageCircle />,
                              "Question",
                              question?.question
                            )}
                            {renderField(
                              <Mic />,
                              "Audio Transcript",
                              question?.audio_transcript
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className="w-full bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors"
                                  onClick={() =>
                                    setSelectedVideo(
                                      question?.videoPath as string
                                    )
                                  }
                                >
                                  <Video className="mr-2 h-4 w-4" />
                                  View Interview Video
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="p-4 max-w-4xl">
                                <DialogTitle className="text-rocken-blue-500 text-2xl pb-2 border-b">
                                  Question {index + 1}
                                </DialogTitle>
                                {selectedVideo ? (
                                  <video
                                    controls
                                    className="w-full rounded-md"
                                    key={selectedVideo}
                                  >
                                    <source
                                      src={selectedVideo}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <p>No video available</p>
                                )}
                              </DialogContent>
                            </Dialog>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
