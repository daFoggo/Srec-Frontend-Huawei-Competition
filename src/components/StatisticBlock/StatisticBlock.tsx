"use client";
import { StatisticBlockProps } from "@/models/Dashboard/Dashboard";

const StatisticBlock = ({ icon, title, value }: StatisticBlockProps) => {
  return (
    <div className="aspect-square bg-white border relative p-2 rounded-xl flex flex-col justify-between">
      <div className="absolute top-2 left-2 text-2xl rounded-full bg-rocken-ground p-2">
        {icon}
      </div>
      <div className="mt-auto">
        <p className="text-sm text-rocken-subtle font-semibold">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatisticBlock;
