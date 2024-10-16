import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ 
  size = 24,
  color = "currentColor",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      <LoaderCircle 
        size={size} 
        color={color}
        className="animate-spin"
      />
    </motion.div>
  );
};

export default LoadingSpinner;