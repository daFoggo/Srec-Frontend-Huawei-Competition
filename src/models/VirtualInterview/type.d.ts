export interface InterviewWebcamProps {
  isRecording: boolean;
  isMicOn: boolean;
  isVideoOn: boolean;
  toggleMic: () => void;
  toggleVideo: () => void;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  videoPath: string;
}

export interface RecordedChunk {
  type: string;
  data: Blob;
}
