import { motion } from "framer-motion";

const LoadingOverlay = ({
  isLoading,
  size = 40,
  color = "#3498db",
}: {
  isLoading: boolean;
  size?: number;
  color?: string;
}) => {
  if (!isLoading) return null;

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: { y: "0%", opacity: 0.5 },
    end: { y: "100%", opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          display: "flex",
          justifyContent: "space-around",
        }}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            style={{
              display: "block",
              width: size / 5,
              height: size / 5,
              backgroundColor: color,
              borderRadius: "50%",
            }}
            variants={circleVariants}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
