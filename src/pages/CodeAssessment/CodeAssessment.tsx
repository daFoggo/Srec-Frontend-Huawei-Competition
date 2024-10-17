"use client";
import { useState } from "react";
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
    <div className="flex justify-between h-screen font-inter">
      <div className="w-1/4 p-5 border-r">
        <ProblemList
          problems={codingProblems}
          selectedProblemId={selectedProblemId}
          onSelectProblem={setSelectedProblemId}
          sessions={userSessions}
        />
      </div>
      <ScrollArea className="w-1/2 p-5">
        {selectedProblem && (
          <CodeEditor
            problem={selectedProblem}
            session={currentSession}
            updateSession={updateSession}
          />
        )}
      </ScrollArea>
      <div className="w-1/4 p-5 border-l">
        <ResultsSummary sessions={userSessions} />
      </div>
    </div>
  );
};

export default CodeAssessment;
