"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditorProps } from "@/models/CodeAssessment/type";
import { Play, SendHorizontal } from "lucide-react";
import ConfirmDialog from "../ConfirmDialog";
import { convertDifficulty, convertMemory } from "@/utils/helper";

export const CodeEditor = ({
  problem,
  session,
  updateSession,
}: CodeEditorProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // select language
  const handleLanguageChange = (value: string) => {
    updateSession({ ...session, language: value as "python" | "cpp" });
  };

  // update code
  const handleCodeChange = (value: string | undefined) => {
    updateSession({ ...session, code: value || "", status: "in-progress" });
  };

  // run code
  const handleRun = () => {
    console.log("Running code with custom input:", input);
    setOutput("Code executed successfully!");
  };

  // submit code
  const handleSubmit = () => {
    console.log("Submitting code for problem:", problem.id);
    setOutput("Code submitted successfully!");
    updateSession({ ...session, status: "completed" });
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-1">
      <div className=" flex justify-between items-start">
        <h2 className="text-3xl font-semibold font-clash text-rocken-blue-500">
          {problem.name}
        </h2>
        <Select onValueChange={handleLanguageChange} value={session.language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <div className="text-sm font-semibold text-rocken-subtle">
          <p>Difficulty : {convertDifficulty(problem.difficulty)}</p>
          <p>Time : {problem.second}s</p>
          <p>
            Memory :{" "}
            {convertMemory(problem.memory_limit_bytes, "byte", "megabyte")}Mb
          </p>
        </div>
        <h3 className="text-lg font-semibold mt-2 text-rocken-blue-400">
          Problem Description
        </h3>
        <p>{problem.description}</p>
        <h4 className="font-semibold mt-2 text-rocken-blue-400">Input</h4>
        <p>{problem.input}</p>
        <h4 className="font-semibold mt-2 text-rocken-blue-400">Output</h4>
        <p>{problem.output}</p>
        <h4 className="font-semibold mt-2 text-rocken-blue-400">Constraints</h4>
        <p>{problem.constraints}</p>
        <h4 className="font-semibold mt-2 text-rocken-blue-400">Example</h4>
        <p>{problem.example}</p>
        <h4 className="font-semibold mt-2 text-rocken-blue-400">Explanation</h4>
        <p>{problem.explanation}</p>
      </div>
      <Editor
        height="40vh"
        language={session.language}
        value={session.code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "JetBrains Mono",
        }}
      />
      <div className="flex space-x-4 p-2">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-rocken-blue-400">
            Input
          </h3>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            className="h-32"
          />
        </div>
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-rocken-blue-400">
            Output
          </h3>
          <Textarea value={output} readOnly className="h-32" />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleRun}
          className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 font-semibold"
          icon={<Play className="h-4 w-4" />}
        >
          Run Code
        </Button>
        <Button
          onClick={() => setShowConfirmDialog(true)}
          className="bg-violet-500 hover:bg-violet-500/90 hover:text-white/90 font-semibold"
          icon={<SendHorizontal className="h-4 w-4" />}
        >
          Submit
        </Button>

        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSubmit}
          title="Submit my solution"
          message={`Are you sure you want to submit your solution for problem ${problem.id}?`}
          confirmText="Submit"
          confirmVariant="default"
        />
      </div>
    </div>
  );
};
