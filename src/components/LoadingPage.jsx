// src/components/LoadingPage.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      <motion.h2
        className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading...
      </motion.h2>
    </div>
  );
};

export default LoadingPage;
