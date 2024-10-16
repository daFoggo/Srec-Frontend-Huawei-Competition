import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { githubLink } from "@/utils/constant";

const RootFooter = () => {
  return (
    <div className="flex flex-col md:flex-row py-4 px-4 md:px-12 items-center justify-between bg-rocken-blue-100">
      {/* Logo and Copyright */}
      <div className="flex flex-col md:flex-row gap-2 items-center font-clash font-medium text-sm mb-4 md:mb-0">
        <p>© Developed by UDU_S4U Team </p>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={githubLink}>
                <Button
                  className="font-clash font-medium bg-transparent text-black hover:bg-rocken-blue-300 hover:text-white transition-colors duration-300"
                  icon={<Github className="h-4 w-4 mr-2" />}
                >
                  Github
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default RootFooter;
