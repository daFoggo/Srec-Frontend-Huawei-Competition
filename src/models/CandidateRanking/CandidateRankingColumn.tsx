import { ColumnDef } from "@tanstack/react-table";
import { ICandidateRanking } from "./CandidateRanking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, ThumbsUp } from "lucide-react";
import { shouldUseTextarea, truncateText } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import axios from "axios";

const DynamicField = ({
  id,
  label,
  value,
  className = "",
}: {
  id: string;
  label: string;
  value: String | Number;
  className?: string;
}) => {
  const stringValue = String(value);
  const useTextarea = shouldUseTextarea(stringValue);

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="font-semibold text-sm">
        {label}
      </Label>
      {useTextarea ? (
        <Textarea
          id={id}
          value={stringValue}
          readOnly
          autoFocus={false}
          className="bg-gray-50 min-h-[100px] resize-none w-full text-sm"
        />
      ) : (
        <Input
          id={id}
          value={stringValue}
          readOnly
          autoFocus={false}
          className="bg-gray-50 w-full text-sm"
        />
      )}
    </div>
  );
};

export const CandidateRankingColumns: ColumnDef<ICandidateRanking>[] = [
  {
    accessorKey: "name",
    header: "Job name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => {
      return truncateText(row.getValue("experience"), 75);
    },
  },
  {
    accessorKey: "academic",
    header: "Academic",
    cell: ({ row }) => {
      return truncateText(row.getValue("academic"), 75);
    },
  },
  {
    accessorKey: "major",
    header: "Major",
  },
  {
    accessorKey: "matching_score",
    header: "Score",
    cell: ({ row }) => {
      return (
        <span className="text-sm font-semibold text-rocken-blue-500">
          {row.getValue("matching_score")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const candidate = row.original;
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);

      const passSingleCandidate = async (candidateId: string) => {
        await axios.post(`/api/pass-candidate/${candidateId}`, {
          candidateId: candidateId,
        });
      };
      const handleProcess = async () => {
        try {
          await passSingleCandidate(String(candidate.id));
          localStorage.setItem("candidate", JSON.stringify(candidate));
        } catch (error) {
          console.error(error);
          toast.error("Failed to process candidate");
        }
      };

      return (
        <div className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-rocken-blue-500 bg-rocken-blue-200 text-rocken-blue-500 hover:bg-rocken-blue-200/90 hover:text-rocken-blue-500/90 transition-colors"
                icon={<Eye className="h-4 w-4" />}
              >
                View
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col font-inter"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle className="text-xl font-bold text-rocken-blue-500">
                  {candidate.name}
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-6">
                  <DynamicField
                    id="matching_score"
                    label="Matching score"
                    value={candidate.matching_score}
                  />
                  <DynamicField id="age" label="Age" value={candidate.age} />
                  <DynamicField
                    id="experience"
                    label="Experience"
                    value={candidate.experience}
                    className="md:col-span-2"
                  />
                  <DynamicField
                    id="academic"
                    label="Academic"
                    value={candidate.academic}
                  />
                  <DynamicField
                    id="major"
                    label="Major"
                    value={candidate.major}
                  />
                  <DynamicField
                    id="email"
                    label="Email"
                    value={candidate.email}
                  />
                  <DynamicField
                    id="skills"
                    label="Skills"
                    value={candidate.skills}
                    className="md:col-span-2"
                  />
                  <DynamicField
                    id="certification"
                    label="Certification"
                    value={candidate.certification}
                    className="md:col-span-2"
                  />
                  <DynamicField
                    id="personality"
                    label="Personality"
                    value={candidate.personality}
                    className="md:col-span-2"
                  />
                  <DynamicField
                    id="language"
                    label="Language"
                    value={candidate.language}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="border-violet-500 bg-violet-200 text-violet-500 hover:bg-violet-200/90 hover:text-violet-500/90 transition-colors"
            onClick={() => setShowConfirmDialog(true)}
            icon={<ThumbsUp className="h-4 w-4" />}
            iconPosition="left"
          >
            Pass
          </Button>

          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleProcess}
            title="Accept this candidate"
            message={`Are you sure you want to pass "${candidate.name}" through the CV screening?
            This action will send an email to the candidate to inform them about the next steps.`}
            confirmText="Accept"
            confirmVariant="default"
          />
        </div>
      );
    },
  },
];