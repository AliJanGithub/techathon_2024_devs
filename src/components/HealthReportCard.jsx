
import React from "react";

const HealthDataCard = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Health Data</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-600 font-medium capitalize">{key}:</span>
            <span className="text-gray-800">
              {value === null || value === "" ? "N/A" : value.toString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthDataCard;
