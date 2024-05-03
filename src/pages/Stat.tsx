import React from "react";

// Define a TypeScript type for the props
type StatProps = {
  value: any;
  unit: string;
  label: string;
  sensor: string;
};

// The Stat component with Tailwind CSS classes
const Stat: React.FC<StatProps> = ({ value, unit, label, sensor }) => {
  return (
    <div className="flex flex-col rounded-lg">
      {" "}
      <div className="bg-gray-100 mb-6 p-4 rounded-lg flex justify-between items-center w-full">
        {" "}
        <div className="flex items-center justify-start gap-1.5 text-xl font-medium text-black">
          {" "}
          {value}{" "}
          <span className="font-normal text-lg text-gray-500 mt-1.5">
            {unit}
          </span>{" "}
        </div>
        <div>
          <div>{label}</div>
          <span className="text-right text-gray-500">{sensor}</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Stat;
