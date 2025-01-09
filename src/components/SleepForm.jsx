import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

// Loader CSS for spinning animation
const loaderStyle = {
  width: "48px",
  height: "48px",
  border: "3px dotted #FFF",
  borderStyle: "solid solid dotted dotted",
  borderRadius: "50%",
  display: "inline-block",
  position: "relative",
  boxSizing: "border-box",
  animation: "rotation 2s linear infinite", // Adding rotation animation
};

const loaderAfterStyle = {
  content: "''",
  boxSizing: "border-box",
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  margin: "auto",
  border: "3px dotted #a85ae8",
  borderStyle: "solid solid dotted",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  animation: "rotationBack 1s linear infinite", // Adding reverse rotation animation
  transformOrigin: "center center",
};

// @keyframes animation to make the loader rotate
const keyframesStyle = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;

// Validation Schema using Yup
const validationSchema = Yup.object({
  date: Yup.string().required("Date is required"),
  sleepHours: Yup.number()
    .required("Sleep hours are required")
    .min(1, "Sleep hours must be at least 1 hour")
    .max(24, "Sleep hours cannot exceed 24 hours"),
  sleepQuality: Yup.string().required("Sleep quality is required"),
  sleepDisturbances: Yup.string(),
});

const SleepForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://medical-assistant-y09w.onrender.com/api/sleep/add",
        values
      );
      setResponseMessage("Sleep data submitted successfully!");
      setShowModal(true);
    } catch (error) {
      setResponseMessage("Error submitting sleep data. Please try again.");
      setShowModal(true);
    } finally {
      setSubmitting(false);
      setLoading(false); // End loading
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative w-full">
      {/* Injecting the keyframes style directly into the component */}
      <style>{keyframesStyle}</style>

      {!showModal ? (
        <Formik
          initialValues={{
            date: "",
            sleepHours: "",
            sleepQuality: "",
            sleepDisturbances: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-200 rounded-lg shadow-md space-y-4 w-full">
              <h3 className="text-lg text-white font-bold">Sleep Data</h3>
              <div>
                <Field
                  type="date"
                  name="date"
                  className={`w-full p-2 border rounded ${
                    touched.date && errors.date ? "border-red-500" : ""
                  }`}
                  placeholder="Date"
                />
              </div>
              <div>
                <Field
                  type="number"
                  name="sleepHours"
                  className={`w-full p-2 border rounded ${
                    touched.sleepHours && errors.sleepHours
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Sleep Hours"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="sleepQuality"
                  className={`w-full p-2 border rounded ${
                    touched.sleepQuality && errors.sleepQuality
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Sleep Quality"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="sleepDisturbances"
                  className="w-full p-2 border rounded"
                  placeholder="Sleep Disturbances"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-400 text-white p-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {/* Show loader if loading is true */}
              {loading && (
                <div className="flex justify-center mt-4">
                  <div style={loaderStyle}>
                    <div style={loaderAfterStyle}></div>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-200 rounded-lg shadow-md space-y-4 w-full">
          <h3 className="text-lg font-bold text-white">Response</h3>
          <p className="text-white">{responseMessage}</p>
          <button
            onClick={closeModal}
            className="w-full bg-indigo-400 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SleepForm;
