
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
      <Sidebar className="border-r">
        <SidebarHeader className="flex items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary p-1.5">
              <PieChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">CRM Pro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path} className="mb-1">
                <Link to={item.path} className="w-full">
                  <SidebarMenuButton
                    isActive={
                      item.path === "/"
                        ? currentPath === "/"
                        : currentPath.startsWith(item.path)
                    }
                    className={cn(
                      "w-full justify-start py-2.5",
                      item.path === "/"
                        ? currentPath === "/"
                          ? "bg-primary/10 text-primary"
                          : ""
                        : currentPath.startsWith(item.path)
                        ? "bg-primary/10 text-primary"
                        : ""
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar;
