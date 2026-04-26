import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const AppLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset id="inset-app-layout-client" className="min-w-0">
        <Header />
        <div className="min-w-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
