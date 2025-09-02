import React from "react";

interface SummaryCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="relative flex flex-col p-4 h-40">
      <h2 className="text-gray-700 font-sm mb-6">{title}</h2>

      <div className="text-5xl text-gray-700  mt-2">{value}</div>

      <div className="absolute bottom-0 left-4 flex items-center text-gray-600 mt-2 text-sm">
        {subtitle}
        <span className="ml-2">{icon}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
