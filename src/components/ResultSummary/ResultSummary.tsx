import { Progress } from "@/components/ui/progress";
import { ResultsSummaryProps } from "@/models/CodeAssessment/CodeAssessment";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResultsSummary = ({ sessions }: ResultsSummaryProps) => {
  const navigate = useNavigate();
  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  );

  const progressPercentage = Math.round(
    (completedSessions.length / sessions.length) * 100
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h2 className="text-3xl text-rocken-blue-500 font-bold mb-4">
          Progress
        </h2>
        <Progress
          value={progressPercentage}
          className="h-2 sm:h-3 bg-rocken-blue-200 text-rocken-blue-500 [&>*]:bg-rocken-blue-500 mb-1"
        />
        <p className="text-sm text-gray-600 mb-4">
          {progressPercentage}% Complete
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-rocken-blue-500">
              {sessions.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-rocken-blue-500">
              {completedSessions.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-2xl font-bold text-rocken-blue-500">
              {sessions.length - completedSessions.length}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-rocken-blue-400 mt-4 mb-4">
          Completed Problems
        </h3>
        <ul className="space-y-2">
          {completedSessions.map((session) => (
            <li
              key={session.problemId}
              className="bg-rocken-blue-100 p-2 rounded"
            >
              <span className="font-semibold">Problem {session.problemId}</span>{" "}
              - {session.language}
            </li>
          ))}
        </ul>
      </div>

      {sessions.length === completedSessions.length && (
        <Button
          className="w-full bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 font-semibold"
          icon={<MoveRight/>}
          iconPosition="right"
          onClick={() => navigate("/candidate/personality-test")}
        >
          Navigate to next test
        </Button>
      )}
    </div>
  );
};
