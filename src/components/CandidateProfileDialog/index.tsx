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
  GraduationCap,
  Code,
  Award,
  Brain,
  Languages,
  Mail,
  Calendar,
  Eye,
} from "lucide-react";
import { ICandidateRanking } from "@/models/CandidateRanking/type";
import { Progress } from "../ui/progress";
const CandidateProfileDialog = ({
  candidate,
  isColumnItem,
}: {
  candidate: ICandidateRanking;
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
            icon={<Eye className="h-4 w-4" />}
          >
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
        className="max-w-2xl font-inter"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-rocken-blue-500 pb-2 border-b mb-4">
            {candidate?.name}'s Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <ProfileItem icon={<Mail />} label="Email" value={candidate?.email} />
          <ProfileItem icon={<Calendar />} label="Age" value={candidate?.age} />
          <ProfileItem
            icon={<Briefcase />}
            label="Experience"
            value={candidate?.experience}
          />
          <ProfileItem
            icon={<GraduationCap />}
            label="Academic"
            value={candidate?.academic}
          />
          <ProfileItem
            icon={<Code />}
            label="Skills"
            value={candidate?.skills}
          />
          <ProfileItem
            icon={<Award />}
            label="Certification"
            value={candidate?.certification}
          />
          <ProfileItem
            icon={<Brain />}
            label="Personality"
            value={candidate?.personality}
          />
          <ProfileItem
            icon={<Languages />}
            label="Languages"
            value={candidate?.language}
          />
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-lg font-semibold text-rocken-blue-500">
            Matching Score
          </p>
          <div className="flex items-center mt-2">
            <Progress
              value={
                typeof candidate?.matching_score === "number"
                  ? candidate.matching_score * 100
                  : 0
              }
              className="h-4 sm:h-3 [&>*]:bg-gradient-to-r from-rocken-blue-100 via-rocken-blue-300 to-rocken-blue-500"
            ></Progress>
            <span className="ml-4 font-semibold">
              {candidate?.matching_score.toString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfileItem = ({ icon, label, value }: any) => (
  <div className="flex items-start">
    <div className="text-rocken-blue-500 mr-3 bg-rocken-ground p-2 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default CandidateProfileDialog;
