import { Link } from "react-router";
import { Briefcase, CalendarCheck, FileText, DollarSign } from "lucide-react";

const EmployeeDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        👋 Welcome to Your Dashboard
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/dashboard/work-sheet"
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-md transition group"
        >
          <Briefcase className="text-primary mb-4 group-hover:scale-110 transition" size={36} />
          <h3 className="font-semibold text-lg mb-1">Work Sheet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Submit your daily tasks and updates.
          </p>
        </Link>

        <Link
          to="/dashboard/employee-attendence"
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-md transition group"
        >
          <CalendarCheck className="text-green-600 mb-4 group-hover:scale-110 transition" size={36} />
          <h3 className="font-semibold text-lg mb-1">Attendance</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your attendance records.
          </p>
        </Link>

        <Link
          to="/dashboard/payment-history"
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-md transition group"
        >
          <DollarSign className="text-yellow-500 mb-4 group-hover:scale-110 transition" size={36} />
          <h3 className="font-semibold text-lg mb-1">Payroll</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your salary & payments.
          </p>
        </Link>

        <Link
          to="/dashboard/profile-update"
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-md transition group"
        >
          <FileText className="text-blue-500 mb-4 group-hover:scale-110 transition" size={36} />
          <h3 className="font-semibold text-lg mb-1">My Profile</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your personal info & updates.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
