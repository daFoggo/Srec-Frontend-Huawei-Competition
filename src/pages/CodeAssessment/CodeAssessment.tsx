"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { codingProblems, initialUserSessions } from "./constant";
import { UserSession } from "@/models/CodeAssessment/CodeAssessment";
import { ProblemList } from "@/components/ProblemList/ProblemList";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import { ResultsSummary } from "@/components/ResultSummary/ResultSummary";
import { ScrollArea } from "@/components/ui/scroll-area";

const CodeAssessment = () => {
  const [selectedProblemId, setSelectedProblemId] = useState(
    codingProblems[0].id
  );
  const [userSessions, setUserSessions] =
    useState<UserSession[]>(initialUserSessions);

  const selectedProblem = codingProblems.find(
    (p) => p.id === selectedProblemId
  )!;
  const currentSession = userSessions.find(
    (s) => s.problemId === selectedProblemId
  )!;

  const updateSession = (updatedSession: UserSession) => {
    setUserSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.problemId === updatedSession.problemId
          ? updatedSession
          : session
      )
    );
  };

  return (
    <motion.div
      className="flex justify-between h-screen font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-1/4 p-5 border-r"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProblemList
          problems={codingProblems}
          selectedProblemId={selectedProblemId}
          onSelectProblem={setSelectedProblemId}
          sessions={userSessions}
        />
      </motion.div>
      <motion.div
        className="w-1/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ScrollArea className=" p-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProblemId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedProblem && (
                <CodeEditor
                  problem={selectedProblem}
                  session={currentSession}
                  updateSession={updateSession}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </motion.div>
      <motion.div
        className="w-1/4 p-5 border-l"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ResultsSummary sessions={userSessions} />
      </motion.div>
    </motion.div>
  );
};

export default CodeAssessment;
