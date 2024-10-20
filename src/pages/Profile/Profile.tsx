import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { user } from "./constant";
import { AtSign, Tag, User } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const renderField = (icon: any, label: string, value: string, index: number) => {
    return (
      <motion.div 
        className="flex gap-4 items-center font-inter font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex items-center gap-2 w-1/4">
          {icon}
          <Label>{label}</Label>
        </div>
        <Input value={value} disabled className="w-3/4 bg-rocken-blue-200 border-rocken-blue-100" />
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="font-clash font-semibold text-3xl text-rocken-blue-500"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Profile
      </motion.h1>
      <div className="flex-col flex gap-2 w-full sm:w-1/2">
        {renderField(<User />, "User name", user.username, 0)}
        {renderField(<AtSign />, "Email", user.email, 1)}
        {renderField(<Tag />, "Role", user.role, 2)}
      </div>
    </motion.div>
  );
};

export default Profile;