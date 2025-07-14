import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white">
      <motion.div
        className="text-center max-w-md p-6 rounded-2xl bg-neutral-800 shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <AlertTriangle size={80} className="text-yellow-500" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-400 mb-6">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary rounded-lg font-semibold transition duration-300 hover:scale-105 hover:bg-primary/80"
        >
          Back To Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
