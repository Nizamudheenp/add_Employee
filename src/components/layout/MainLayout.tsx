import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Overview Cards");

  const handleSidebarItemClick = (item: string) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="w-full h-screen bg-[#F6F5FA] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[19.6vw] max-w-[377px] min-w-[220px] h-full">
        <Sidebar
          selectedItem={selectedSidebarItem}
          onItemClick={handleSidebarItemClick}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="h-[88px] bg-header-bg z-30 sticky top-0">
          <Header />
        </div>

        {/* Content Section */}
        <main className="flex-1 px-4 sm:px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
