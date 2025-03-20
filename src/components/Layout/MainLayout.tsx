
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="container mx-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
