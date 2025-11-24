import { SidebarInset, SidebarProvider } from "@lewora/ui";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-accent/20">{children}</SidebarInset>
		</SidebarProvider>
	);
};

export default Layout;
