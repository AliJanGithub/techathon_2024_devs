import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  symptoms: Yup.string().required("Symptoms are required"),
  medications: Yup.string().required("Medications are required"),
  bloodPressure: Yup.string().required("Blood Pressure is required"),
  bloodSugar: Yup.number()
    .required("Blood Sugar is required")
    .min(0, "Blood Sugar must be a positive number"),
  temperature: Yup.number()
    .required("Temperature is required")
    .min(30, "Temperature cannot be lower than 30°C")
    .max(45, "Temperature cannot exceed 45°C"),
});

const MedicalForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://medical-assistant-y09w.onrender.com/api/medical/add",
        values
      );
      setResponseMessage(
        response.data.insights || "Medical data submitted successfully!"
      );
      setShowModal(true);
    } catch (error) {
      setResponseMessage("Error submitting medical data. Please try again.");
      setShowModal(true);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative w-full">
      {!showModal && !loading ? (
        <Formik
          initialValues={{
            userId: "123456",
            date: "",
            symptoms: "",
            medications: "",
            bloodPressure: "",
            bloodSugar: "",
            temperature: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="p-4 bg-gradient-to-r from-purple-400 via-purple-400 to-pink-300 rounded-lg shadow-md space-y-4 w-full">
              <h3 className="text-lg text-white font-bold">Medical Data</h3>

              <div>
                <Field
                  type="date"
                  name="date"
                  className={`w-full p-2 border rounded ${
                    touched.date && errors.date ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="symptoms"
                  className={`w-full p-2 border rounded ${
                    touched.symptoms && errors.symptoms ? "border-red-500" : ""
                  }`}
                  placeholder="Symptoms"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="medications"
                  className={`w-full p-2 border rounded ${
                    touched.medications && errors.medications
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Medications"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="bloodPressure"
                  className={`w-full p-2 border rounded ${
                    touched.bloodPressure && errors.bloodPressure
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Blood Pressure"
                />
              </div>

              <div>
                <Field
                  type="number"
                  name="bloodSugar"
                  className={`w-full p-2 border rounded ${
                    touched.bloodSugar && errors.bloodSugar
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Blood Sugar"
                />
              </div>

              <div>
                <Field
                  type="number"
                  name="temperature"
                  className={`w-full p-2 border rounded ${
                    touched.temperature && errors.temperature
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Temperature"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-300 text-white p-2 rounded"
                disabled={isSubmitting || loading}
              >
                Submit
              </button>

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
        <div className="p-4 bg-gradient-to-r from-purple-400 via-purple-400 to-pink-300 rounded-lg shadow-md space-y-4 w-full">
          <h3 className="text-lg font-bold text-white">Response</h3>
          <p className="text-white">{responseMessage}</p>
          <button
            onClick={closeModal}
            className="w-full bg-pink-300 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicalForm;
