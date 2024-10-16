import { Code, FileText, UserSearch, Video } from "lucide-react";

export const achievements = [
  { title: "Coding exercises", number: "4,000+" },
  { title: "Personality questions", number: "1,000+" },
  { title: "Interview questions", number: "100+" },
];

export const modules = [
  {
    title: "Resume screening",
    icon: <FileText className="w-6 h-6" />,
    description: "LLM and text-matching algorithms",
  },
  {
    title: "Coding assessment",
    icon: <Code className="w-6 h-6" />,
    description: "Job description-generated problems",
  },
  {
    title: "Personality tests",
    icon: <UserSearch className="w-6 h-6" />,
    description: "Machine learning models",
  },
  {
    title: "Virtual interviews",
    icon: <Video className="w-6 h-6" />,
    description: "Simulating real scenarios",
  },
];
