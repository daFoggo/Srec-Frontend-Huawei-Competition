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

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1) % introduction.length);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4 bg-cover bg-center bg-no-repeat font-clash"
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
        <Card className="backdrop-blur-md bg-white/30 shadow-sm relative overflow-hidden border-white/20 border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl font-semibold bg-gradient-to-t from-rocken-blue-300 to-rocken-blue-500 bg-clip-text text-transparent">
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
                className="flex flex-col items-center p-4 sm:p-6 h-[400px] sm:h-[450px] justify-center text-center"
              >
                <h3 className="text-2xl sm:text-3xl font-semibold text-rocken-blue-500 mb-4">
                  {introduction[currentSlide].title}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg font-medium mb-6 max-w-2xl">
                  {introduction[currentSlide].description}
                </p>
                {currentSlide === introduction.length - 1 && (
                  <Button
                    className="bg-violet-400 hover:bg-violet-400/90 text-white hover:text-white/90 mt-4 px-6 py-2 rounded-full transition-colors"
                    onClick={() => navigate("/candidate/code-assessment")}
                  >
                    Start Recruitment Process
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
              className="absolute bottom-4 right-4 bg-rocken-blue-500 text-white hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors rounded-full p-2"
              aria-label="Next slide"
            >
              <ArrowRight />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute bottom-4 left-4 bg-rocken-blue-500 text-white hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors rounded-full p-2"
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
