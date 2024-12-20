import React from 'react';
import sourceImage from '../assets/about.jpeg'

function About() {
  return (
    <div className='flex justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-screen'> 
      <div className="text-center text-white p-8"> 
        <h1 className="text-3xl font-bold mb-4">Techathon_2024: Devs</h1>
        <img 
          src={sourceImage}
          alt="Techathon Image" 
          style={{width:"500px", height:"300px"}}
          className="mx-auto mb-4" 
        /> 
        <p className="text-lg">
          This project is an AI-powered health assistant designed to help people 
          improve their well-being. 
          You can interact with our AI chatbot for personalized health advice 
          or track your health records for a more comprehensive understanding 
          of your health journey.
        </p>
      </div>
    </div>
  );
}

export default About;