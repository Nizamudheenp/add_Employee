import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("Overview Cards");
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const handleSidebarItemClick = (item: string) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="w-full h-screen bg-[#F6F5FA] flex overflow-hidden">
      {/* Sidebar */}
      <div
        className="h-screen fixed top-0 left-0 z-40 bg-sidebar-bg"
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar
          selectedItem={selectedSidebarItem}
          onItemClick={handleSidebarItemClick}
          setSidebarWidth={setSidebarWidth}
        />
      </div>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Header */}
        <div
          className="h-[88px] fixed top-0 right-0 z-30 bg-header-bg"
          style={{ left: `${sidebarWidth}px` }}
        >
          <Header />
        </div>

        {/* Content Section */}
        <main
          className="flex-1 px-6 overflow-y-auto"
          style={{ paddingTop: "88px" }} // ✅ Push content below header
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
