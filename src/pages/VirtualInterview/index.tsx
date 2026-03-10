"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CirclePause, CirclePlay, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog";
import { motion } from "framer-motion";
import InterviewWebcam from "@/components/InterviewWebcam";
import { interviewQuestions } from "./constant";
import { RecordedChunk } from "@/models/VirtualInterview/type";

const VirtualInterview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<RecordedChunk[]>([]);
  const [progress, setProgress] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const interviewVideoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Unused constraints - keeping for potential future use
  // const videoConstraints = {
  //   width: 1920,
  //   height: 1080,
  //   facingMode: "user",
  // };

  useEffect(() => {
    if (interviewVideoRef.current) {
      interviewVideoRef.current.src =
        interviewQuestions[currentQuestionIndex].videoPath;
      interviewVideoRef.current.load();
    }
    setProgress((currentQuestionIndex / interviewQuestions.length) * 100);
  }, [currentQuestionIndex]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => [...prev, { type: "video/webm", data }]);
      }
    },
    [setRecordedChunks]
  );

  const startRecording = useCallback(() => {
    setRecordedChunks([]);
    setIsRecording(true);
    if (interviewVideoRef.current) {
      interviewVideoRef.current.play();
    }
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [handleDataAvailable]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (interviewVideoRef.current) {
      interviewVideoRef.current.pause();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const sendRecordedVideo = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(
        recordedChunks.map((chunk) => chunk.data),
        {
          type: "video/webm",
        }
      );

      // Create FormData and append the blob
      const formData = new FormData();
      formData.append(
        "video",
        blob,
        `interview-question-${currentQuestionIndex + 1}.webm`
      );

      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Video upload failed");
        }

        // Handle successful upload
        console.log("Video uploaded successfully");
      } catch (error) {
        console.error("Error uploading video:", error);
        // Handle error (e.g., show error message to user)
      }

      setRecordedChunks([]);
    }
  }, [recordedChunks, currentQuestionIndex]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
    setShowConfirmDialog(true);
  }, [stopRecording]);

  const handleConfirmSubmit = useCallback(() => {
    sendRecordedVideo();
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsInterviewComplete(true);
      setProgress(100);
    }
    setShowConfirmDialog(false);
  }, [sendRecordedVideo, currentQuestionIndex]);

  const toggleMic = useCallback(() => {
    setIsMicOn((prevState) => {
      const newState = !prevState;
      if (webcamRef.current && webcamRef.current.stream) {
        webcamRef.current.stream.getAudioTracks().forEach((track) => {
          track.enabled = newState;
        });
      }
      return newState;
    });
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoOn((prevState) => {
      const newState = !prevState;
      if (webcamRef.current && webcamRef.current.stream) {
        webcamRef.current.stream.getVideoTracks().forEach((track) => {
          track.enabled = newState;
        });
      }
      return newState;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto p-4 md:p-6 min-h-screen font-inter"
    >
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Left side */}
        <InterviewWebcam
          isRecording={isRecording}
          isMicOn={isMicOn}
          isVideoOn={isVideoOn}
          toggleMic={toggleMic}
          toggleVideo={toggleVideo}
        />

        {/* Right side */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white shadow-sm border rounded-xl h-full">
            <CardContent className="flex flex-col justify-between gap-6 p-4 h-full">
              {/* Progress */}
              <div>
                <h3 className="mb-4 font-clash font-semibold text-rocken-blue-500 text-2xl">
                  Virtual Interview
                </h3>
                <div className="relative pt-1">
                  <Progress
                    value={progress}
                    className="[&>*]:bg-gradient-to-r from-rocken-blue-300 to-rocken-blue-500 mb-2 h-2 sm:h-3"
                  ></Progress>
                  <p className="font-semibold text-rocken-subtle text-xs">
                    Question {currentQuestionIndex + 1} of{" "}
                    {interviewQuestions.length}
                  </p>
                </div>
              </div>

              {/* AI model */}
              <div>
                <video
                  ref={interviewVideoRef}
                  className="bg-rocken-blue-100 shadow-sm rounded-xl w-full aspect-video"
                ></video>
              </div>

              {/* Interview question */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-rocken-blue-500 shadow-sm p-4 rounded-xl"
              >
                <p className="mb-6 font-semibold text-white text-lg text-center">
                  {interviewQuestions[currentQuestionIndex].question}
                </p>
                {!isInterviewComplete ? (
                  <Button
                    onClick={isRecording ? handleStopRecording : startRecording}
                    className={`w-full ${
                      isRecording
                        ? "bg-rocken-blue-300 hover:bg-rocken-blue-300/90"
                        : "bg-rocken-blue-400 hover:bg-rocken-blue-400/90"
                    } text-white font-semibold transition-colors`}
                  >
                    {isRecording ? (
                      <CirclePause className="mr-2 w-5 h-5" />
                    ) : (
                      <CirclePlay className="mr-2 w-5 h-5" />
                    )}
                    {isRecording ? "End Question" : "Start Question"}
                  </Button>
                ) : (
                  <Button
                    className="bg-rocken-blue-200 hover:bg-rocken-blue-200/90 w-full font-semibold text-rocken-blue-500 hover:text-rocken-blue-500/90 transition-colors"
                    onClick={() => navigate("/candidate/thank-you")}
                  >
                    Finish Interview
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit your answer"
        message={`Are you sure you want to submit your answer for question ${
          currentQuestionIndex + 1
        }?`}
        confirmText="Accept"
        confirmVariant="default"
      />
    </motion.div>
  );
};

export default VirtualInterview;
