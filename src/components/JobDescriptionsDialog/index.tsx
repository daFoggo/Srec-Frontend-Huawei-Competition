import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Briefcase,
  FileText,
  Code,
  Users,
  Eye,
} from "lucide-react";
import { IJobDescription } from "@/models/JobDescriptions/type";

const JobDescriptionsDialog = ({
  job,
  isColumnItem,
}: {
  job: IJobDescription;
  isColumnItem: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isColumnItem ? (
          <Button
            variant="outline"
            size="sm"
            className="bg-rocken-blue-200 hover:bg-rocken-blue-200/90 border-rocken-blue-500 text-rocken-blue-500 hover:text-rocken-blue-500/90 transition-colors"
          >
            <Eye className="mr-2 w-4 h-4" />
            View
          </Button>
        ) : (
          <Button
            className="border-transparent focus:border-transparent text-sm"
            variant="outline"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-w-3xl font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-4 pb-2 border-b text-rocken-blue-500 text-2xl">
            {job.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <ProfileItem icon={<Briefcase />} label="Level" value={job.level} />
          <ProfileItem
            icon={<Users />}
            label="Applied"
            value={job.applied.toString()}
          />
          <ProfileItem
            icon={<FileText />}
            label="Description"
            value={job.description}
            isLongText
          />
          <ProfileItem
            icon={<Code />}
            label="Skills Required"
            value={job.skills_required}
            isLongText
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfileItem = ({ icon, label, value, isLongText = false }: any) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 bg-rocken-ground mr-3 p-2 rounded-full text-rocken-blue-500">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="mb-1 font-semibold text-gray-500 text-sm">{label}</p>
      <p
        className={`font-medium ${isLongText ? "text-sm leading-relaxed" : ""}`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default JobDescriptionsDialog;
