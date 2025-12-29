import { Logo } from "@/lib/assets";

export const TopSidebar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-5 border-b border-gray-800 bg-black">
      <Logo className="h-[40px]" />
    </div>
  );
};
