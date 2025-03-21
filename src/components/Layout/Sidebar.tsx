
import { Link, useLocation } from "react-router-dom";
import { Building2, Contact, LayoutDashboard, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: <Contact className="h-5 w-5" />,
    },
    {
      name: "Deals",
      path: "/deals",
      icon: <PieChart className="h-5 w-5" />,
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <SidebarHeader className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary p-1.5 shadow-md">
              <PieChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CRM Pro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="px-3 py-4">
            <SidebarMenu className="space-y-1.5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <Link to={item.path} className="w-full">
                    <SidebarMenuButton
                      isActive={
                        item.path === "/"
                          ? currentPath === "/"
                          : currentPath.startsWith(item.path)
                      }
                      className={cn(
                        "w-full justify-start gap-3 rounded-md px-4 py-2.5 font-medium transition-all",
                        item.path === "/"
                          ? currentPath === "/"
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                          : currentPath.startsWith(item.path)
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar;
