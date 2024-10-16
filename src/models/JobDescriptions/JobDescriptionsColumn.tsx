import { ColumnDef } from "@tanstack/react-table";
import { IJobDescription } from "./JobDescriptions";
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
import { ExternalLink, Eye } from "lucide-react";
import { shouldUseTextarea, truncateText } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

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
    <div className={`space-y-2 ${className} font-inter`}>
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      {useTextarea ? (
        <Textarea
          id={id}
          value={stringValue}
          readOnly
          autoFocus={false}
          className="bg-gray-50 min-h-[120px] resize-none w-full"
        />
      ) : (
        <Input
          id={id}
          value={stringValue}
          readOnly
          autoFocus={false}
          className="bg-gray-50 w-full"
        />
      )}
    </div>
  );
};

export const JobDescriptionsColumn: ColumnDef<IJobDescription>[] = [
  {
    accessorKey: "name",
    header: "Job name",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "applied",
    header: "Applied",
  },
  {
    accessorKey: "skills_required",
    header: "Skill required",
    cell: ({ row }) => {
      return truncateText(row.getValue("skills_required"), 100);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
      const navigate = useNavigate();
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);

      const handleProcess = () => {
        navigate(`/recruiter/candidate-ranking/${job.id}`, {
          state: { selectedJob: job },
        });
        localStorage.setItem("job", JSON.stringify(job));
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
                  {job.name}
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-6">
                  <DynamicField
                    id="description"
                    label="Description"
                    value={job.description}
                  />
                  <DynamicField
                    id="skills_required"
                    label="Skills Required"
                    value={job.skills_required}
                  />
                  <DynamicField id="level" label="Level" value={job.level} />
                  <DynamicField
                    id="applied"
                    label="Applied"
                    value={job.applied}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="border-rocken-sand-500 bg-rocken-sand-100 text-rocken-sand-500 hover:bg-rocken-sand-100/90 hover:text-rocken-sand-500/90 transition-colors"
            onClick={() => setShowConfirmDialog(true)}
            icon={<ExternalLink className="h-4 w-4" />}
            iconPosition="left"
          >
            Start matching
          </Button>

          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleProcess}
            title="Start Matching Process"
            message={`Are you sure you want to start matching process for job "${job.name}"?`}
            confirmText="Start Process"
            confirmVariant="default"
          />
        </div>
      );
    },
  },
];
