import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Form = () => {
  const [formData, setFormData] = useState({
    steps: "",
    caloriesBurned: "",
    sleepHours: "",
    notes: "",
    stressLevel: "",
    physicalActivity: "",
    exerciseType: "",
    caloriesConsumed: "",
    waterIntake: "",
    meals: "",
    weight: "",
    mood: "",
    symptoms: "",
    medications: "",
    bloodPressure: "",
    bloodSugar: "",
    temperature: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/health/analyze",
        formData
      );
      setResponseMessage(
        response.data.insights || "Form submitted successfully!"
      );
      setModalVisible(true); // Show the modal
      // Reset form state after successful submission
      setFormData({
        steps: "",
        caloriesBurned: "",
        sleepHours: "",
        notes: "",
        stressLevel: "",
        physicalActivity: "",
        exerciseType: "",
        caloriesConsumed: "",
        waterIntake: "",
        meals: "",
        weight: "",
        mood: "",
        symptoms: "",
        medications: "",
        bloodPressure: "",
        bloodSugar: "",
        temperature: "",
      });
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message ||
          "Error submitting data. Please try again."
      );
      setModalVisible(true); // Show the modal for error
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-900 via-purple-600 to-pink-500 shadow-xl w-full">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
        Health Tracker Form
      </h2>
      <div className="w-full flex justify-end">
        <Link to="/YourReport">
          <button className="py-2 px-4 bg-transparent border border-white rounded-lg hover:bg-white hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Your Monthly Report
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: "steps", label: "Steps", type: "number" },
            { id: "caloriesBurned", label: "Calories Burned", type: "number" },
            { id: "sleepHours", label: "Sleep Hours", type: "number" },
            {
              id: "stressLevel",
              label: "Stress Level",
              type: "select",
              options: ["Low", "Medium", "High"],
            },
            {
              id: "physicalActivity",
              label: "Physical Activity",
              type: "text",
            },
            { id: "exerciseType", label: "Exercise Type", type: "text" },
            {
              id: "caloriesConsumed",
              label: "Calories Consumed",
              type: "number",
            },
            { id: "waterIntake", label: "Water Intake (ml)", type: "number" },
            { id: "meals", label: "Meals", type: "number" },
            { id: "weight", label: "Weight (kg)", type: "number" },
            {
              id: "mood",
              label: "Mood",
              type: "select",
              options: ["Happy", "Neutral", "Sad", "Angry"],
            },
            { id: "bloodPressure", label: "Blood Pressure", type: "text" },
            { id: "bloodSugar", label: "Blood Sugar", type: "number" },
            { id: "temperature", label: "Temperature", type: "number" },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-lg font-semibold text-white mb-2 drop-shadow-md"
              >
                {field.label}:
              </label>
              {field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-inner"
                >
                  <option value="">Select</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-inner"
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-h-screen w-full sm:w-11/12 md:w-4/5 lg:w-2/3 p-6 rounded-lg shadow-lg overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Response</h3>
            <pre className="mb-4 whitespace-pre-wrap text-sm text-gray-800">
              {responseMessage}
            </pre>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
