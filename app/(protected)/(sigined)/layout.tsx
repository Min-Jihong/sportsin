import { BottomNavigation } from "./componets/bottom-navigation";
import { TopSidebar } from "./componets/top-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh bg-linear-to-b from-gray-900 via-gray-900 to-black">
      <TopSidebar />
      <main className="flex-1 pt-[81px] pb-[61px] overflow-y-auto">{children}</main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
