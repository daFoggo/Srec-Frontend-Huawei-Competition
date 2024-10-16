import RecruiterNavBar from "@/components/RecruiterNavBar/RecruiterNavBar";
import RootFooter from "@/components/RootFooter/RootFooter";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const RecruiterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <RecruiterNavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
        <Toaster
          toastOptions={{
            style: {},
          }}
          position="top-center"
        />
      </main>
      <footer>
        <RootFooter />
      </footer>
    </div>
  );
};

export default RecruiterLayout;
