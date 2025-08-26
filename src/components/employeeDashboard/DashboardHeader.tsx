import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import dashicon from "../../assets/icons/dashicon.svg";

const DashboardHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center space-x-2 text-gray-600 my-6">
            <button
                onClick={() => navigate(-1)}
                className="flex border px-4 py-1 items-center space-x-1 text-sm font-medium hover:text-gray-800 shadow rounded"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </button>
            <img src={dashicon} alt="Dashboard" className="w-7 h-7 text-blue-500 bg-blue-100 rounded-full p-1" />
            <span className="text-sm font-sm text-gray-400">Employees Dashboard</span>
        </div>
    );
};

export default DashboardHeader;


