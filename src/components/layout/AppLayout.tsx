import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
};
export function AppLayout({ children, container = true }: AppLayoutProps): JSX.Element {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-row-reverse">
        <AppSidebar />
        <SidebarInset className="relative flex w-full flex-col bg-background overflow-x-hidden">
          <header className="flex h-16 items-center justify-between border-b px-6 sticky top-0 bg-background/80 backdrop-blur-md z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-bold">النظام الذكي لإدارة قطع الغيار</h1>
            </div>
            <ThemeToggle className="relative top-0 right-0" />
          </header>
          <main className="flex-1 overflow-y-auto">
            {container ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
                {children}
              </div>
            ) : (
              children
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}