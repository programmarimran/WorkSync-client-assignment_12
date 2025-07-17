import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Lock } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const ForbiddenPage = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white">
      <motion.div
        className="text-center max-w-md p-8 rounded-2xl bg-neutral-800 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: -15 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Lock size={80} className="text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
        <p className="text-gray-400 mb-6">
          You do not have permission to access this page.<br />
          Please log out and log in again with the correct account.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 rounded-lg font-semibold transition duration-300 hover:scale-105 hover:bg-red-700"
          >
            Logout
          </button>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-primary rounded-lg font-semibold transition duration-300 hover:scale-105 hover:bg-primary/80"
          >
            Go to Login
          </Link>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold transition duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
