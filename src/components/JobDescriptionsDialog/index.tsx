import React from "react";
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
            className="border-rocken-blue-500 bg-rocken-blue-200 text-rocken-blue-500 hover:bg-rocken-blue-200/90 hover:text-rocken-blue-500/90 transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        ) : (
          <Button
            className="text-sm border-transparent focus:border-transparent"
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
          <DialogTitle className="text-2xl text-rocken-blue-500 pb-2 border-b mb-4">
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
    <div className="text-rocken-blue-500 mr-3 bg-rocken-ground p-2 rounded-full flex-shrink-0">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-sm text-gray-500 font-semibold mb-1">{label}</p>
      <p
        className={`font-medium ${isLongText ? "text-sm leading-relaxed" : ""}`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default JobDescriptionsDialog;
