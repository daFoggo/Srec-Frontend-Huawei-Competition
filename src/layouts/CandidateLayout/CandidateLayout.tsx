import CandidateNavBar from "@/components/CandidateNavBar/CandidateNavBar";
import RootFooter from "@/components/RootFooter/RootFooter";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const CandidateLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <CandidateNavBar />
      </header>
      <main className="flex-grow">
        <Outlet />
        <Toaster
          toastOptions={{
            style: {
              color: "#4893f4"
            },
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

export default CandidateLayout;
