"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import UserMenu from "../UserMenu/UserMenu";

const RootNavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  {
    /* Active color */
  }
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-clash font-medium transition-colors duration-300 ${
      isActive(path)
        ? "bg-rocken-blue-100 text-rocken-blue-500"
        : "hover:bg-rocken-blue-100 hover:text-rocken-blue-500 transition-colors "
    } focus:bg-rocken-blue-100 focus:text-rocken-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

  {
    /* Mobile menu */
  }
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-4 px-4 md:px-12 border-b shadow-sm border-gray-300">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Button
            variant="outline"
            className="flex gap-2 items-center font-clash font-semibold text-2xl md:text-3xl border-transparent hover:text-rocken-blue-500 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            SREC
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className={linkClass("/")}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className={linkClass("/about")}>
                    About the project
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className={linkClass("/contact")}>
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Sign In Button */}
            </NavigationMenuList>
          </NavigationMenu>
          <UserMenu />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mt-4 md:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col space-y-2">
              <motion.div variants={itemVariants}>
                <Link to="/" className={linkClass("/")} onClick={toggleMenu}>
                  Home
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/about"
                  className={linkClass("/about")}
                  onClick={toggleMenu}
                >
                  About the project
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/contact"
                  className={linkClass("/contact")}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
            <motion.div variants={itemVariants}>
              <UserMenu />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RootNavBar;
