import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/context/DashboardSideBarContext";
import DashboardHeaderComponent from "../../components/DashboardHeaderComponent";
import DashboardSideBarComponent from "../../components/DashboardSideBarComponent";
import DashboardView from "../../components/DashboardViewComponent";
import "../globals.css";

function Dashboard() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSideBarComponent />
          <div className="flex-1 flex flex-col">
            <DashboardHeaderComponent />
          </div>
          {/* <DashboardView /> */}
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
export default Dashboard;
