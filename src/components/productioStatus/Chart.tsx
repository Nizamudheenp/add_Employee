import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface ChartProps {
    data: { label: string; value: number }[];
    color: string;
    rateTitle: string;
}

const Chart: React.FC<ChartProps> = ({ data, color, rateTitle }) => {
    return (
        <div className="px-4 pb-4">
            <div className="flex items-center justify-end mb-2 text-sm">
                <div
                    className="w-4 h-3 rounded-sm mr-1"
                    style={{ backgroundColor: color }}
                ></div>
                <span className="text-gray-600 ">{rateTitle}</span>
            </div>

            <ResponsiveContainer width="100%"  height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.7} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="label" axisLine={false} tickLine={false} tickMargin={15}/>

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        ticks={[0, 25, 50, 75, 100, 150, 200]}
                        domain={[0, 201]}
                        interval={0}
                        tickMargin={15}  
                        tick={{ textAnchor: "start", dx: -20 }} 
                    />

                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#${color})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
