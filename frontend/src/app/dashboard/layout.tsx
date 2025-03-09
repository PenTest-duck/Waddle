import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col w-full p-4 overflow-hidden">
        <header className="flex shrink-0 items-center">
          <div className="flex flex-row w-full justify-between">
            <SidebarTrigger />
            <Avatar>
              <AvatarFallback>CY</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="mt-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;