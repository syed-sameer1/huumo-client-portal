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
      <SidebarInset id="inset-app-layout-client">
        <Header />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
