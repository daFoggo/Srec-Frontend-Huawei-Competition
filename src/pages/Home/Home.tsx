import homeBackground from "@/assets/images/Home/home_background.svg";
import recruitmentImage from "@/assets/images/Home/recruitment_image.jpg";
import { achievements, modules } from "./constant";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left side */}
      <motion.div
        className="w-full lg:w-1/2 relative overflow-hidden p-8 lg:p-12 text-white bg-gradient-to-b from-rocken-blue-500 to-rocken-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={homeBackground}
            alt="Background"
            className="w-full h-full object-cover mix-blend-overlay pt-40"
          />
        </motion.div>
        <motion.p
          className="font-clash font-medium text-4xl lg:text-6xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Smart <br />
          Recruiting
        </motion.p>
      </motion.div>

      {/* Right side */}
      <motion.div
        className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col gap-8 lg:gap-12 items-center overflow-y-auto h-screen"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Title */}
        <motion.div
          className="w-full text-2xl lg:text-3xl"
          variants={itemVariants}
        >
          <p className="font-clash font-medium">
            Automating the recruitment process
          </p>
          <div className="flex items-center w-full font-clash font-medium">
            <div className="flex-grow h-px bg-gray-300 mr-4"></div>
            <p className="text-rocken-blue-500">with AI</p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start gap-6 font-clash font-medium"
          variants={itemVariants}
        >
          <div className="aspect-square w-full lg:w-1/3 mb-4 lg:mb-0">
            <img
              src={recruitmentImage}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            <p className="text-left">
              By providing a comprehensive evaluation of both technical and
              interpersonal skills, SREC aims to{" "}
              <b className="text-rocken-blue-500 font-medium">revolutionize</b>{" "}
              the recruitment process, saving{" "}
              <b className="text-rocken-blue-500 font-medium">time</b> and
              improving{" "}
              <b className="text-rocken-blue-500 font-medium">accuracy</b> while{" "}
              <b className="text-rocken-blue-500 font-medium">
                promoting inclusivity
              </b>
              .
            </p>
            <Link to="/sign-in">
              <Button
                className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 w-fit transition-colors"
                icon={<Sparkles className="w-4 h-4" />}
                iconPosition="right"
              >
                Let's try
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Modules */}
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="font-clash font-medium text-2xl lg:text-3xl"
            variants={itemVariants}
          >
            SREC Modules
          </motion.p>
          <motion.p
            className="font-clash text-lg mb-6 text-rocken-subtle"
            variants={itemVariants}
          >
            Automated online recruitment system for IT companies and futhermore,
            evaluating both hard and soft skills
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                className="bg-rocken-blue-100 font-clash rounded-lg p-6 flex items-start gap-6"
                variants={itemVariants}
              >
                <div className="text-rocken-blue-500">{module.icon}</div>
                <div>
                  <p className="font-medium text-lg">{module.title}</p>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="flex flex-col gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="font-clash font-medium text-2xl lg:text-3xl"
            variants={itemVariants}
          >
            Achievements
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                className="flex justify-between items-center gap-6 w-full bg-rocken-blue-100 rounded-lg p-6"
                key={index}
                variants={itemVariants}
              >
                <p className="font-clash text-2xl lg:text-3xl font-bold text-rocken-blue-500">
                  {achievement.number}
                </p>
                <p className="font-clash text-sm lg:text-lg font-medium text-right">
                  {achievement.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
