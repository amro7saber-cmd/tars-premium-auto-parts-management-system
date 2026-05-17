import React from "react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Car, 
  Users, 
  Settings,
  ShieldCheck
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const menuItems = [
    { title: "لوحة القيادة", icon: LayoutDashboard, path: "/" },
    { title: "المخزون", icon: Package, path: "/inventory" },
    { title: "نقطة البيع", icon: ShoppingCart, path: "/pos" },
    { title: "المركبات", icon: Car, path: "/vehicles" },
    { title: "الموردين", icon: Users, path: "/suppliers" },
  ];
  return (
    <Sidebar side="right">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">تَــرس</span>
            <span className="text-xs text-muted-foreground font-medium">TARS SYSTEM</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  className="h-12 text-base"
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">المسؤول</span>
            <span className="text-[10px] text-muted-foreground">عرض الملف الشخصي</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}