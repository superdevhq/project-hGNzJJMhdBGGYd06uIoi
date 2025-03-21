
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
