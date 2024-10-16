import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FileSearch2, MoveRight, NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { user } from "./constant";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const UserMenu = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const currentRole = localStorage.getItem("role");
    if (isSignedIn) {
      setIsSignedIn(true);
    }

    if (currentRole) {
      setCurrentRole(currentRole);
    }

    return () => {
      setIsSignedIn(false);
      setCurrentRole("");
    };
  });

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  if (isSignedIn) {
    return (
      <motion.div variants={itemVariants}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="font-clash font-semibold">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-100 font-inter cursor-pointer">
            <DropdownMenuLabel>
              {user.username} <br />
              <p className="text-xs text-rocken-subtle">{currentRole}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {currentRole === "Recruiter" ? (
              <>
                <DropdownMenuGroup>
                  <Link to="/recruiter/job-descriptions">
                    <DropdownMenuItem>
                      <FileSearch2 className="mr-2 h-4 w-4" />
                      <span>Start recruitment</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            ) : currentRole === "Candidate" ? (
              <>
                <DropdownMenuGroup>
                  <Link to="/candidate/introduction">
                    <DropdownMenuItem>
                      <NotepadText className="mr-2 h-4 w-4" />
                      <span>Start my test</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      <Link to="/sign-in">
        <Button className="w-full font-clash font-medium bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90 transition-colors">
          Sign in
          <MoveRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default UserMenu;
