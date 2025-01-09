import React from "react";
import doctorImage from ".././assets/doctor-removebg-preview.png"; // Replace with the actual path

function ChatCard() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <img src={doctorImage} alt="Doctor" className="mb-4 rounded-full" />
      <h2 className="text-xl font-semibold mb-4">Chat with Doctor</h2>
      <p className="text-sm mb-6">
        Get in touch with medical professionals for personalized advice.
      </p>
      <a
        href="/chat"
        className="bg-white text-blue-500 px-4 py-2 rounded font-medium hover:bg-blue-100"
      >
        Start Chat
      </a>
    </div>
  );
}

export default ChatCard;
