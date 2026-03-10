import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { introduction } from "./constant";
import { motion, AnimatePresence } from "framer-motion";
import loginBackground from "@/assets/images/Login/login_background.png";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % introduction.length);
  };

  // Unused function - keeping for potential future use
  // const previousSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1) % introduction.length);
  // };

  return (
    <div
      className="flex justify-center items-center bg-cover bg-no-repeat bg-center p-4 min-h-screen font-clash"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="relative bg-white/30 shadow-sm backdrop-blur-md border-2 border-white/20 overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="bg-clip-text bg-gradient-to-t from-rocken-blue-300 to-rocken-blue-500 font-semibold text-transparent text-3xl sm:text-4xl">
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-center items-center p-4 sm:p-6 h-[400px] sm:h-[450px] text-center"
              >
                <h3 className="mb-4 font-semibold text-rocken-blue-500 text-2xl sm:text-3xl">
                  {introduction[currentSlide].title}
                </h3>
                <p className="mb-6 max-w-2xl font-medium text-gray-700 text-base sm:text-lg">
                  {introduction[currentSlide].description}
                </p>
                {currentSlide === introduction.length - 1 && (
                  <Button
                    className="bg-violet-400 hover:bg-violet-400/90 mt-4 px-6 py-2 rounded-full text-white hover:text-white/90 transition-colors"
                    onClick={() => navigate("/candidate/code-assessment")}
                  >
                    Start Recruitment Process
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="bottom-4 left-1/2 absolute flex space-x-2 -translate-x-1/2 transform">
              {introduction.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentSlide
                      ? "bg-rocken-blue-500/50"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={nextSlide}
              className="right-4 bottom-4 absolute bg-rocken-blue-500 hover:bg-rocken-blue-500/90 p-2 rounded-full text-white hover:text-white/90 transition-colors"
              aria-label="Next slide"
            >
              <ArrowRight />
            </Button>
            <Button
              onClick={nextSlide}
              className="bottom-4 left-4 absolute bg-rocken-blue-500 hover:bg-rocken-blue-500/90 p-2 rounded-full text-white hover:text-white/90 transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
