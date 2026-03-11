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
    <div className="flex lg:flex-row flex-col">
      {/* Left side */}
      <motion.div
        className="relative bg-gradient-to-b from-rocken-blue-500 to-rocken-blue-200 p-8 lg:p-12 w-full lg:w-1/2 overflow-hidden text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="z-0 absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={homeBackground}
            alt="Background"
            className="pt-40 w-full h-full object-cover mix-blend-overlay"
          />
        </motion.div>
        <motion.p
          className="z-10 relative font-clash font-medium text-4xl lg:text-6xl"
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
        className="flex flex-col items-center gap-8 lg:gap-12 p-8 lg:p-12 w-full lg:w-1/2 h-screen overflow-y-auto"
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
            <div className="flex-grow bg-gray-300 mr-4 h-px"></div>
            <p className="text-rocken-blue-500">with AI</p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="flex lg:flex-row flex-col justify-between items-start gap-6 font-clash font-medium"
          variants={itemVariants}
        >
          <div className="mb-4 lg:mb-0 w-full lg:w-1/3 aspect-square">
            <img
              src={recruitmentImage}
              alt=""
              className="rounded-md w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-2/3">
            <p className="text-left">
              By providing a comprehensive evaluation of both technical and
              interpersonal skills, SREC aims to{" "}
              <b className="font-medium text-rocken-blue-500">revolutionize</b>{" "}
              the recruitment process, saving{" "}
              <b className="font-medium text-rocken-blue-500">time</b> and
              improving{" "}
              <b className="font-medium text-rocken-blue-500">accuracy</b> while{" "}
              <b className="font-medium text-rocken-blue-500">
                promoting inclusivity
              </b>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/recruiter/job-descriptions">
                <Button className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors">
                  Recruiter Portal
                </Button>
              </Link>
              <Link to="/candidate/introduction">
                <Button
                  variant="outline"
                  className="hover:bg-rocken-blue-50 border-rocken-blue-500 text-rocken-blue-500"
                >
                  Candidate Portal
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button
                  className="bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors"
                  icon={<Sparkles className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Let's try
                </Button>
              </Link>
            </div>
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
            className="mb-6 font-clash text-rocken-subtle text-lg"
            variants={itemVariants}
          >
            Automated online recruitment system for IT companies and futhermore,
            evaluating both hard and soft skills
          </motion.p>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6 bg-rocken-blue-100 p-6 rounded-lg font-clash"
                variants={itemVariants}
              >
                <div className="text-rocken-blue-500">{module.icon}</div>
                <div>
                  <p className="font-medium text-lg">{module.title}</p>
                  <p className="text-gray-600 text-sm">{module.description}</p>
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

          <div className="gap-6 grid grid-cols-1 md:grid-cols-1">
            {achievements.map((achievement, index) => (
              <motion.div
                className="flex justify-between items-center gap-6 bg-rocken-blue-100 p-6 rounded-lg w-full"
                key={index}
                variants={itemVariants}
              >
                <p className="font-clash font-bold text-rocken-blue-500 text-2xl lg:text-3xl">
                  {achievement.number}
                </p>
                <p className="font-clash font-medium text-sm lg:text-lg text-right">
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
