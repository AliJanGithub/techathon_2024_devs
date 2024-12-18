// D:\React JS Projects\techathon_2024_devs\techathon_2024_devs\src\assets\trackYourRecord-removebg-preview.png

import React from 'react';
import recordImage from 'D:/React JS Projects/techathon_2024_devs/techathon_2024_devs/src/assets/trackYourRecord-removebg-preview.png'; // Replace with the actual path

function RecordCard() {
  return (
    <div className="bg-gradient-to-r from-black via-purple-600 to-red-400 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <img 
    //   style={{width:'30px', height:'40px'}}
      src={recordImage} alt="Medical Record" className="mb-4 rounded-full" /> 
      <h2 className="text-xl font-semibold mb-4">Track Your Record</h2>
      <p className="text-sm mb-6">Monitor and manage your medical history and progress.</p>
      <h2>File Tracking</h2>
      <p className='text-sm mb-6'>Upload your daily report and Track your monthly report</p>
      <a
        href="/record"
        className="bg-white text-green-500 px-4 py-2 rounded font-medium hover:bg-green-100"
      >
        Track Now
      </a>
    </div>
  );
}

export default RecordCard;