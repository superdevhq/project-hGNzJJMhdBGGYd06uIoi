
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 dark:bg-slate-950 md:grid-cols-[260px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1 p-5 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
