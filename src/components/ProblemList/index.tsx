"use client";
import { Button } from "@/components/ui/button";
import { ProblemListProps } from "@/models/CodeAssessment/type";
import {
  CheckCheck,
  ChevronsLeftRightEllipsis,
  CircleDashed,
} from "lucide-react";
import { truncateText } from "@/utils/helper";

export const ProblemList = ({
  problems,
  selectedProblemId,
  onSelectProblem,
  sessions,
}: ProblemListProps) => {
  return (
    <div className="w-full overflow-y-auto p-1">
      <h2 className="text-3xl font-semibold mb-4 text-rocken-blue-500 font-clash">Problems</h2>
      {problems?.map((problem) => {
        const session = sessions.find((s) => s.problemId === problem.id);
        return (
          <Button
            key={problem.id}
            variant={problem.id === selectedProblemId ? "default" : "outline"}
            className={`font-semibold w-full mb-2 justify-start flex items-center ${
              problem.id === selectedProblemId
                ? "bg-rocken-blue-500 text-white hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors"
                : "border-rocken-blue-500/50 bg-rocken-blue-200/50 text-rocken-blue-500/50 hover:border-rocken-blue-500/50 hover:bg-rocken-blue-200/50 hover:text-rocken-blue-500/40 transition-colors"
            }`}
            onClick={() => onSelectProblem(problem.id)}
          >
            <p>{truncateText(problem.name, 30)}</p>
            {session && (
              <span
                className={`ml-2 text-lg ${
                  session.status === "completed"
                    ? "text-violet-300"
                    : session.status === "in-progress"
                    ? "text-rocken-sand-300"
                    : "text-gray-300"
                }`}
              >
                {session.status === "completed" ? (
                  <CheckCheck className="w-6 h-6" />
                ) : session.status === "in-progress" ? (
                  <ChevronsLeftRightEllipsis className="w-6 h-6" />
                ) : (
                  <CircleDashed className="w-6 h-6" />
                )}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};
