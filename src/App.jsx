import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/About';
import Chat_With_Gemini from './screens/Chat_With_Gemini';
import Track_Your_Report from './screens/Track_Your_Report';
import Form from './screens/Form';
import Your_Monthly_Report from './screens/Your_Monthly_Report';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat_With_Gemini />} />
        <Route path="/record" element={<Form />} />
        <Route path="/YourReport" element={<Your_Monthly_Report />} />

      </Routes>
      
    </>
  );
}

export default App;
