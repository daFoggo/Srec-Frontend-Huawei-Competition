"use client";
import { StatisticBlockProps } from "@/models/Dashboard/type";

const StatisticBlock = ({ icon, title, value }: StatisticBlockProps) => {
  return (
    <div className="bg-white border relative p-3 md:p-4 rounded-xl flex flex-col justify-between shadow-sm h-24 md:h-1/2">
      <div className="absolute top-3 md:top-4 left-3 md:left-4 rounded-full bg-rocken-ground p-1.5 md:p-2">
        {icon}
      </div>
      <div className="mt-auto">
        <p className="text-xs md:text-sm text-rocken-subtle font-semibold line-clamp-2">
          {title}
        </p>
        <p className="text-lg md:text-xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatisticBlock;