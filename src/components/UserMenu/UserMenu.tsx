import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
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

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    if (isSignedIn) {
      setIsSignedIn(true);
    }

    return () => {
      setIsSignedIn(false);
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
            <Avatar>
              <AvatarFallback className="font-clash font-semibold">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-100 font-inter ">
            <DropdownMenuLabel>
              {user.username} <br />
              <p className="text-xs text-rocken-subtle">{user.email}</p>
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
        <Button className="w-full font-clash font-medium bg-rocken-blue-500 hover:bg-rocken-blue-500/90 hover:text-white/90">
          Sign in
          <MoveRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default UserMenu;
