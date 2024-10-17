import personalityTestBackground from "@/assets/images/PersonalityTest/personality_test_background.png";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Ruler, Turtle } from "lucide-react";
import PersonalityQuestion from "@/components/PersonalityQuestion/PersonalityQuestion";
import { useState } from "react";
import { questions } from "./constant";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import axios from "axios";
import { toast } from "sonner";

const PersonalityTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestions = questions.slice(
    currentQuestionIndex,
    currentQuestionIndex + 5
  );

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const isAllQuestionsAnswered =
    Object.keys(answers).length === questions.length;

  const handleAnswer = (questionId: any, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    // format data
    const submissionData = questions.map((question) => ({
      id: question.id,
      code: question.code,
      answer: answers[question.id],
    }));

    try {
      await axios.post("/api/personality-test", submissionData);
      toast.success("Test submitted successfully");
      console.log("Test submitted successfully");
    } catch (error) {
      console.error("Failed to submit test:", error);
      toast.error("Failed to submit test");
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="relative font-inter">
      <div
        className="min-h-[40vh] w-full py-8 flex items-center justify-center"
        style={{
          backgroundImage: `url(${personalityTestBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-3xl font-bold text-white">
              Personality Test
            </h1>
            <p className="text-base sm:text-xl font-semibold text-white/80 mt-2">
              Based on Big 5 Personality Traits
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-white shadow-sm ">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rocken-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-semibold text-rocken-subtle">
                Be yourself and answer honestly so we can better understand who
                you are
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Ruler className="text-white font-semibold" />
                </div>
              </div>
              <p className="font-semibold text-rocken-subtle">
                Knowing your personality type can help us determine if this job
                is suitable for you
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center">
                  <Turtle className="text-white font-semibold" />
                </div>
              </div>
              <p className="font-semibold text-rocken-subtle">
                You can take the test at your own pace, and there’s no time
                limit
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress section */}
        <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-lg sm:text-xl font-semibold text-rocken-blue-500">
              Progress
            </span>
            <span className="text-lg sm:text-xl font-semibold text-rocken-blue-500">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 sm:h-3 bg-rocken-blue-200 text-rocken-blue-500 [&>*]:bg-rocken-blue-500"
          />
        </div>

        {/* Questions section */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            {currentQuestions.map((question) => (
              <PersonalityQuestion
                key={question.id}
                question={question}
                currentValue={answers[question.id]}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            ))}

            <div className="flex justify-between mt-8">
              <Button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 5))
                }
                disabled={currentQuestionIndex === 0}
                className="bg-violet-500 hover:bg-violet-500/90 hover:text-white/90 transition-colors text-sm sm:text-base px-3 sm:px-4"
              >
                Previous
              </Button>

              {currentQuestionIndex >= questions.length - 5 &&
              isAllQuestionsAnswered ? (
                <Button
                  onClick={() => setShowConfirm(true)}
                  disabled={!isAllQuestionsAnswered || isSubmitting}
                  className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors text-sm sm:text-base px-3 sm:px-4"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) =>
                      Math.min(questions.length - 5, prev + 5)
                    )
                  }
                  disabled={currentQuestionIndex >= questions.length - 5}
                  className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors text-sm sm:text-base px-3 sm:px-4"
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Personality Test"
        message="Are you sure you want to submit your answers? You won't be able to change them after submission."
        confirmText="Submit"
        cancelText="Cancel"
      />
    </div>
  );
};

export default PersonalityTest;
