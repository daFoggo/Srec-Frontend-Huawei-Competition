import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import RootNavBar from "@/components/RootNavBar/RootNavBar";
import RootFooter from "@/components/RootFooter/RootFooter";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <RootNavBar />
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

export default RootLayout;
