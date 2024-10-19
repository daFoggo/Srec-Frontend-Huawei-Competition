import React, { useState } from "react";
import { motion } from "framer-motion";
import personalityTestBackground from "@/assets/images/PersonalityTest/personality_test_background.png";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Ruler, Turtle } from "lucide-react";
import PersonalityQuestion from "@/components/PersonalityQuestion/PersonalityQuestion";
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
    const submissionData = questions.map((question) => ({
      id: question.id,
      code: question.code,
      answer: answers[question.id],
    }));

    try {
      await axios.post("/api/personality-test", submissionData);
      toast.success("Test submitted successfully");
    } catch (error) {
      console.error("Failed to submit test:", error);
      toast.error("Failed to submit test");
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { width: `${progress}%`, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="min-h-[40vh] w-full py-8 flex items-center justify-center"
        style={{
          backgroundImage: `url(${personalityTestBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <h1 className="text-3xl sm:text-3xl font-semibold font-clash text-white">
              Personality Test
            </h1>
            <p className="text-base sm:text-xl font-medium font-clash text-white/80 mt-2">
              Based on Big 5 Personality Traits
            </p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: Heart,
              color: "bg-rocken-blue-500",
              text: "Be yourself and answer honestly so we can better understand who you are",
            },
            {
              icon: Ruler,
              color: "bg-yellow-400",
              text: "Knowing your personality type can help us determine if this job is suitable for you",
            },
            {
              icon: Turtle,
              color: "bg-violet-500",
              text: "You can take the test at your own pace, and there's no time limit",
            },
          ].map((item, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="bg-white shadow-sm h-full">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} rounded-lg flex items-center justify-center`}
                    >
                      <item.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-rocken-subtle">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
            className="h-4 sm:h-3 mb-2 [&>*]:bg-gradient-to-r from-rocken-blue-100 via-rocken-blue-300 to-rocken-blue-500"
          ></Progress>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardContent className="p-4 sm:p-6">
              {currentQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PersonalityQuestion
                    question={question}
                    currentValue={answers[question.id]}
                    onAnswer={(value) => handleAnswer(question.id, value)}
                  />
                </motion.div>
              ))}

              <motion.div
                className="flex justify-between mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
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
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
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
    </motion.div>
  );
};

export default PersonalityTest;
