import { ColumnDef } from "@tanstack/react-table";
import { ICandidateRanking } from "./type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThumbsUp } from "lucide-react";
import { shouldUseTextarea, truncateText } from "@/utils/helper";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "sonner";
import axios from "axios";
import CandidateProfileDialog from "@/components/CandidateProfileDialog";

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
          <CandidateProfileDialog candidate={candidate} isColumnItem={true} />

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
