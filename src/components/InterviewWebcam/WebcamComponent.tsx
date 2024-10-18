"use client";
import { useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  User,
  Disc,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewWebcamProps } from "@/models/VirtualInterview/VirtualInterview";

const InterviewWebcam = ({
  isRecording,
  isMicOn,
  isVideoOn,
  toggleMic,
  toggleVideo,
}: InterviewWebcamProps) => {
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2"
    >
      <div className="relative aspect-video bg-rocken-blue-100 rounded-xl overflow-hidden shadow-sm">
        <Webcam
          ref={webcamRef}
          mirrored={true}
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Badge className="absolute top-4 right-4 px-2 py-1 bg-rocken-sand-400 text-white">
                <Disc className="w-4 h-4 mr-1" />
                Recording
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          <Button
            onClick={toggleMic}
            variant="secondary"
            size="icon"
            className="rounded-full bg-[#484944]/70 text-white hover:bg-[#484944]/90"
          >
            {isMicOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={toggleVideo}
            variant="secondary"
            size="icon"
            className="rounded-full bg-[#484944]/70 text-white hover:bg-[#484944]/90"
          >
            {isVideoOn ? (
              <Video className="h-4 w-4" />
            ) : (
              <VideoOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-[#484944]/70 text-white hover:bg-[#484944]/90"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <Badge className="absolute top-4 left-4 px-2 py-1 bg-rocken-blue-500 text-white">
          <User className="w-4 h-4 mr-1" />
          {localStorage?.getItem("name") || "Candidate"}
        </Badge>
      </div>
    </motion.div>
  );
};

export default InterviewWebcam;
