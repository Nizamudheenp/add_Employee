import React from 'react';
import logo from '../../assets/images/icons/logo.svg';
import overview from '../../assets/images/icons/overview.svg';
import attendance from '../../assets/images/icons/attendancesammery.svg';
import leave from '../../assets/images/icons/leaverequest.svg';
import task from '../../assets/images/icons/tasktracker.svg';
import productivity from '../../assets/images/icons/prodectivityandstatus.svg';
import quick from '../../assets/images/icons/quickactionpanal.svg';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  selectedItem: string;
  onItemClick: (itemLabel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onItemClick }) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview Cards', icon: overview },
    { id: 'attendance', label: 'Attendance Summary', icon: attendance },
    { id: 'leave', label: 'Leave Requests', icon: leave },
    { id: 'task', label: 'Task Tracker', icon: task },
    { id: 'productivity', label: 'Productivity & Stats', icon: productivity },
    { id: 'quick', label: 'Quick Action Panel', icon: quick },
  ];

  return (
   <div className="w-[250px] md:w-[300px] lg:w-[300px] min-h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-5">
        <img src={logo} className="w-[34px] h-[34px]" alt="Ziya Logo" />
        <h1 className="text-[18px] font-semibold text-ziyablue tracking-wide font-['Poppins']">
        ADMIN DASHBOARD
        </h1>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mb-4" />

      {/* Sidebar Items */}
      <div className="flex flex-col gap-2 px-3">
        {sidebarItems.map((item) => {
          const isActive = selectedItem === item.label;

          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item.label)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-all duration-200 ${
                isActive ? 'bg-[#E1F1FF]' : 'hover:bg-[#E1F1FF]'
              }`}
            >
             <img
  src={item.icon}
  alt={item.label}
  className={`w-[24px] h-[24px] transition-all duration-200 ${
    isActive ? 'filter-blue' : ''
  }`}
/>
              <span
                className={`text-sm font-medium font-['Poppins'] ${
                  isActive ? 'text-ziyablue' : 'text-gray-700'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
