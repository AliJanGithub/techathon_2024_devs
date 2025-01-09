import React from "react";
import SleepForm from "../components/SleepForm";
import PhysicalForm from "../components/PhysicalForm";
import MedicalForm from "../components/MedicalForm";

const HealthTracker = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-900 via-purple-600 to-pink-500 shadow-xl min-h-[calc(100vh-72px)]">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg my-6 pb-3">
        Health Tracker
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        <div className=" bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-200 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto flex items-center min-h-[500px]">
          <SleepForm />
        </div>
        <div
          className=" bg-gradient-to-r from-indigo-900 via-purple-400 to-pink-200 rounded-lg shadow-lg p-6
        w-full max-w-md mx-auto flex items-center min-h-[500px]"
        >
          <PhysicalForm />
        </div>
        <div className="bg-gradient-to-r from-purple-400 via-purple-400 to-pink-300 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto flex items-center min-h-[500px]">
          <MedicalForm />
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;
