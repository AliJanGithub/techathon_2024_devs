import React from "react";
import { Link } from "react-router-dom"; // Import for navigation link
import imagePath from ".././assets/doctor-removebg-preview.png"; // Replace with the actual path

function Header() {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4 mb-4">
      <div className="flex items-center">
        <img
          src={imagePath}
          alt="Gemini Logo"
          className="w-10 h-10 rounded-full mr-4"
        />
        <h1 className="text-xl font-semibold">AI Doctor</h1>
      </div>
      <Link to="/" className="text-blue-500 hover:underline">
        Back
      </Link>
    </header>
  );
}

export default Header;
