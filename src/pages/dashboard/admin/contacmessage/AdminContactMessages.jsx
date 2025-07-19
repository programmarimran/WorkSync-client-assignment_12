import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Mail, Eye } from "lucide-react";
import moment from "moment";
import MessageModal from "./MessageModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminContactMessages = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: messages = [], refetch, isLoading } = useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-messages");
      return res.data;
    },
  });

  const handleView = (message) => {
    setSelectedMessage(message);
    setIsOpen(true);

    //  Mark as read
    if (!message.read) {
      axiosSecure.patch(`/contact-messages/${message._id}`).then(() => {
        refetch();
      });
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white flex items-center gap-2">
        <Mail className="w-6 h-6" /> Contact Messages
      </h2>

      {isLoading ? (
        <p className="text-center dark:text-white">Loading...</p>
      ) : messages.length < 1 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-2 dark:text-gray-100">{msg.name}</td>
                  <td className="px-4 py-2 dark:text-gray-100">{msg.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {moment(msg.date).format("D MMM, YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    {msg.read ? (
                      <span className="text-green-600 text-xs font-medium">Read</span>
                    ) : (
                      <span className="text-red-500 text-xs font-medium">Unread</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleView(msg)}
                      className="text-primary hover:text-primary/80 dark:text-primary/60 dark:hover:text-primary/50 flex items-center gap-1"
                    >
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isOpen && selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => {
            setIsOpen(false);
            setSelectedMessage(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminContactMessages;
