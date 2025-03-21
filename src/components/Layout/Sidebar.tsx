
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
        <SidebarHeader className="flex h-14 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <PieChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold">CRM Pro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="p-2">
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
                      "w-full justify-start gap-2 px-3 py-2",
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
                    <span>{item.name}</span>
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
