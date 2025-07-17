import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkEditModal = ({ isOpen, setIsOpen, currentEditWork, handleUpdate }) => {
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(0);
  const [editDate, setEditDate] = useState(new Date());

  useEffect(() => {
    if (currentEditWork) {
      setTask(currentEditWork.task);
      setHours(currentEditWork.hours);
      setEditDate(new Date(currentEditWork.date));
    }
  }, [currentEditWork]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate({ task, hours, date: editDate });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="block w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent"
          >
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>

          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="block w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent"
            placeholder="Hours Worked"
          />

          <DatePicker
            selected={editDate}
            onChange={(date) => setEditDate(date)}
         
            className="block w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />

          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 px-4 bg-primary/90 text-white rounded hover:bg-primary/100">
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkEditModal;
