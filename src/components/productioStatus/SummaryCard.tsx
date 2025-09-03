import React from "react";

interface SummaryCardProps {
  title: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <div className="relative flex flex-col p-4">
      <h2 className="text-gray-700 text-sm mb-6">{title}</h2>
      <div className="text-5xl text-gray-700 mt-2">{value}</div>
    </div>
  );
};

export default SummaryCard;
