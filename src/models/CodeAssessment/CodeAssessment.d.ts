export interface UserSession {
  problemId: number;
  code: string;
  language: "python" | "cpp";
  status: "not-started" | "in-progress" | "completed";
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
}

export interface CodeEditorProps {
  problem: Problem;
  session: UserSession;
  updateSession: (session: UserSession) => void;
}

export interface ProblemListProps {
  problems: Problem[];
  selectedProblemId: number;
  onSelectProblem: (id: number) => void;
  sessions: UserSession[];
}

export interface ResultsSummaryProps {
  sessions: UserSession[];
}
