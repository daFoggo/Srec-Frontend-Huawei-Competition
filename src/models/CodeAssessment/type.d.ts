export interface UserSession {
  problemId: number;
  code: string;
  language: "python" | "cpp";
  status: "not-started" | "in-progress" | "completed";
}

export interface Problem {
  id: number;
  source: string;
  name: string;
  description: string;
  input: string;
  output: string;
  constraints: string;
  example: string;
  explanation: string;
  public_input: string;
  public_output: string;
  gen_input: string;
  gen_output: string;
  difficulty: number;
  second: number;
  nano: number;
  memory_limit_bytes: number;
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
