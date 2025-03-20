
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AppSidebar />
      <div className="flex-1 overflow-hidden">
        <Navbar />
        <main className="container mx-auto h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
