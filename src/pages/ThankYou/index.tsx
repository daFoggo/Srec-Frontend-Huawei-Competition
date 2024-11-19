import React from 'react';
import thankYouBackground from "@/assets/images/ThankYou/thank_you_background.png";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ui/particles-background";
import { motion } from "framer-motion";
import { House, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div
      className="font-clash min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative overflow-hidden px-4 py-8"
      style={{
        backgroundImage: `url(${thankYouBackground})`,
      }}
    >
      <ParticlesBackground />

      <motion.div
        className="flex flex-col gap-6 text-center justify-center items-center relative z-10 max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-t from-rocken-blue-300 to-rocken-blue-500 bg-clip-text text-transparent"
          animate={{
            y: [0, -5, 0],
            transition: {
              y: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            },
          }}
        >
          VAMOS!
        </motion.h1>

        <motion.p
          className="text-base md:text-lg lg:text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          You have done a great job. Now please wait for the new information
          from your recruiter. <br className="hidden md:inline" />
          Thanks for using SREC. If you have any feedback, please let us know.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full"
        >
          <Button
            icon={<House className="w-4 h-4 md:w-5 md:h-5" />}
            iconPosition="right"
            className="w-full sm:w-fit px-4 sm:px-6 justify-between text-base md:text-lg lg:text-xl mt-6 sm:mt-12 bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white-90 transition-colors"
            onClick={() => navigate("/")}
          >
            Homepage
          </Button>
          <Button
            icon={<MoveRight className="w-4 h-4 md:w-5 md:h-5" />}
            iconPosition="right"
            className="w-full sm:w-fit px-4 sm:px-6 justify-between text-base md:text-lg lg:text-xl mt-2 sm:mt-12 transition-colors"
            onClick={() => navigate("/contact")}
          >
            Contact us
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;