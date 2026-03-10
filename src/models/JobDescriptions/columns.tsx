import { ColumnDef } from "@tanstack/react-table";
import { IJobDescription } from "./type";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { truncateText } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import JobDescriptionsDialog from "@/components/JobDescriptionsDialog";

/* Unused component - keeping for potential future use
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
          className="bg-gray-50 w-full min-h-[120px] resize-none"
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
*/

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
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);
      const navigate = useNavigate();

      const handleProcess = () => {
        localStorage.setItem("job", JSON.stringify(job));
        navigate("/recruiter/candidate-ranking/" + job.id);
      };

      return (
        <div className="flex items-center gap-2">
          <JobDescriptionsDialog job={job} isColumnItem={true} />
          <Button
            variant="outline"
            size="sm"
            className="bg-rocken-sand-100 hover:bg-rocken-sand-100/90 border-rocken-sand-500 text-rocken-sand-500 hover:text-rocken-sand-500/90 transition-colors"
            onClick={() => setShowConfirmDialog(true)}
            icon={<ExternalLink className="w-4 h-4" />}
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
