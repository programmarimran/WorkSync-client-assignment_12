import { X } from "lucide-react";

const MessageModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
        >
          <X />
        </button>
        <h3 className="text-xl font-bold mb-2 dark:text-white">{message.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{message.email}</p>
        <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
