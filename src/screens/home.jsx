import React from 'react'

function home() {
  return (
   <>
  
      {/* Main Feature Section */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold mb-8 text-gray-700">Rare Disease Web App</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Chat with Doctor Card */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Chat with Doctor</h2>
            <p className="text-sm mb-6">Get in touch with medical professionals for personalized advice.</p>
            <a
              href="/chat"
              className="bg-white text-blue-500 px-4 py-2 rounded font-medium hover:bg-blue-100"
            >
              Start Chat
            </a>
          </div>

          {/* Track Your Record Card */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold mb-4">Track Your Record</h2>
            <p className="text-sm mb-6">Monitor and manage your medical history and progress.</p>
            <a
              href="/record"
              className="bg-white text-green-500 px-4 py-2 rounded font-medium hover:bg-green-100"
            >
              Track Now
            </a>
          </div>
        </div>
    </div>
    </>
  )
}

export default home
