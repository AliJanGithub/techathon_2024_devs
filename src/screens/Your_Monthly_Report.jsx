import React, { useState } from "react";
import HealthDataCard from "../components/HealthReportCard";

function Your_Monthly_Report() {
  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReport = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }

      const data = await response.json();
      setResponseMessage(data.insights || "No insights available.");
      setModalVisible(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Monthly Report's Insights
      </h1>

      <button
        onClick={getReport}
        className={`${
          loading ? "cursor-wait" : "hover:bg-blue-700"
        } bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1`}
        disabled={loading}
      >
        {loading ? "Fetching Report..." : "Get Complete Report of Insight"}
      </button>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-h-screen w-full sm:w-11/12 md:w-4/5 lg:w-2/3 p-6 rounded-lg shadow-lg overflow-y-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Response
            </h3>
            <pre className="mb-4 whitespace-pre-wrap text-sm text-gray-700 bg-gray-100 p-4 rounded">
              {responseMessage}
            </pre>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 font-semibold">Error: {error}</div>
      )}
    </div>
  );
}

export default Your_Monthly_Report;
