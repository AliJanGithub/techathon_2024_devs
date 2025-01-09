import React from "react";
import ChatCard from "../components/Chat_Card";
import RecordCard from "../components/TrackYourRecord_Widget";
import { motion } from "framer-motion";

function home() {
  return (
    <>
      {/* Main Feature Section */}
      <div className=" bg-gradient-to-r from-black via-purple-500 to-blue-500 flex flex-col justify-center items-center p-4 min-h-[calc(100vh-72px)]">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
          className="text-2xl font-bold mb-8 text-white"
        >
          AI-Powered Personal Health Assistant
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Chat with Doctor Card */}
          <ChatCard />

          {/* Track Your Record Card */}
          <RecordCard />
        </div>
      </div>
    </>
  );
}

export default home;
