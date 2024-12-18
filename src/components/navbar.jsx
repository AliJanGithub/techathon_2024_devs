import React from 'react'
import { Link } from 'react-router-dom';


function navbar() {
  return (
    <div className='bg-red-500 flex justify-center'>
        <ul className='flex space-x-4'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/chat">Chat With Doctor</Link></li>
            <li><Link to="/record">Track Your Record</Link></li>
        </ul>
    </div>
  )
}

export default navbar
