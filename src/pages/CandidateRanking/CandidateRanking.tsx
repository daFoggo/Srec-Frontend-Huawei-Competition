import { useLocation } from "react-router-dom";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { DataTable } from "@/components/ui/data-table";
import { useState, useEffect } from "react";
import { candidates } from "./constant";
import { CandidateRankingColumns } from "@/models/CandidateRanking/CandidateRankingColumn";
import { ICandidateRanking } from "@/models/CandidateRanking/CandidateRanking";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import axios from "axios";
import { PERCENTAGE_OPTIONS } from "@/utils/constant";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

const CandidateRanking = () => {
  const location = useLocation();
  const job =
    location.state?.selectedJob ||
    (localStorage.getItem("job")
      ? JSON.parse(localStorage.getItem("job") as string)
      : null);

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState<string>();
  const [candidateRankingData, setCandidateRankingData] =
    useState<ICandidateRanking[]>(candidates);

  const getJobDescriptions = async () => {
    setIsLoading(true);
    try {
      toast.success("Ranking data loaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to load ranking data");
    } finally {
      setIsLoading(false);
    }
  };

  const passSingleCandidate = async (candidateId: string) => {
    await axios.post(`/api/pass-candidate/${candidateId}`, {
      candidateId: candidateId,
    });
  };

  const handleBulkPass = async () => {
    if (!selectedPercentage) {
      toast.error("Please select a percentage first");
      return;
    }

    setIsLoading(true);
    try {
      const percentage = parseInt(selectedPercentage);
      const candidateCount = Math.ceil(
        (candidateRankingData.length * percentage) / 100
      );

      const sortedCandidates = [...candidateRankingData]
        .sort((a, b) => Number(b.matching_score) - Number(a.matching_score))
        .slice(0, candidateCount);

      await Promise.all(
        sortedCandidates.map((candidate) =>
          passSingleCandidate(String(candidate.id))
        )
      );

      toast.success(`Successfully passed top ${percentage}% candidates`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to process candidates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobDescriptions();
  }, []);

  return (
    <div className="p-6 font-inter">
      {isLoading && <LoadingOverlay isLoading={isLoading} />}

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-semibold font-clash text-3xl">CV ranking for</h1>
          <p className="text-lg font-medium font-clash text-rocken-subtle">
            {job?.name}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <Select onValueChange={setSelectedPercentage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select percentage of candidates" />
            </SelectTrigger>
            <SelectContent>
              {PERCENTAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="default"
            onClick={() => setShowConfirmDialog(true)}
            disabled={!selectedPercentage}
            className="bg-violet-500 hover:bg-violet-600 text-white"
            icon={<Users className="h-4 w-4" />}
          >
            Bulk Pass
          </Button>

          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleBulkPass}
            title="Accept these candidates"
            message={`Are you sure you want to pass top ${selectedPercentage}% of candidates through the CV screening?
            This action will send an email to the candidate to inform them about the next steps.`}
            confirmText="Accept"
            confirmVariant="default"
          />
        </div>

        <DataTable
          columns={CandidateRankingColumns}
          data={candidateRankingData}
        />
      </div>
    </div>
  );
};

export default CandidateRanking;
