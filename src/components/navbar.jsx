import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-black via-purple-500 to-blue-500 text-white flex justify-center py-4"> 
      <ul className="flex space-x-4">
        <li 
          className={`hover:bg-purple-700 hover:text-white rounded-md p-2 transition-colors duration-300 ${location.pathname === '/' ? 'bg-purple-700 text-white rounded-md p-2' : ''}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li 
          className={`hover:bg-purple-700 hover:text-white rounded-md p-2 transition-colors duration-300 ${location.pathname === '/about' ? 'bg-purple-700 text-white rounded-md p-2' : ''}`}
        >
          <Link to="/about">About</Link>
        </li>
        <li 
          className={`hover:bg-purple-700 hover:text-white rounded-md p-2 transition-colors duration-300 ${location.pathname === '/chat' ? 'bg-purple-700 text-white rounded-md p-2' : ''}`}
        >
          <Link to="/chat">Chat With Doctor</Link>
        </li>
        <li 
          className={`hover:bg-purple-700 hover:text-white rounded-md p-2 transition-colors duration-300 ${location.pathname === '/record' ? 'bg-purple-700 text-white rounded-md p-2' : ''}`}
        >
          <Link to="/record">Track Your Record</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;