// src/pages/dashboard/admin/AdminDashboard.jsx

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import iconMap from "../../../homePage/services/iconMap";
import { Link } from "react-router";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });
  // console.log(stats)
  const cards = [
    {
      id: 1,
      title: "Total Employees",
      count: stats.totalEmployees || 0,
      icon: iconMap["user-plus"],
    },
    {
      id: 2,
      title: "Pending Payments",
      count: stats.pendingPayments || 0,
      icon: iconMap["wallet"],
    },
    {
      id: 3,
      title: "Monthly Payroll",
      count: stats.monthlyPayroll || 0,
      icon: iconMap["file-text"],
    },
    {
      id: 4,
      title: "Total Departments",
      count: stats.totalDepartments || 0,
      icon: iconMap["bar-chart-2"],
    },
    {
      id: 5,
      title: "Total Unread message",
      count: stats.unreadMessage || 0,
      icon: iconMap["message-circle"],
    },
  ];

  if (isLoading) {
    return (
      <p className="text-center py-10 text-lg font-medium">
        Loading Dashboard...
      </p>
    );
  }
  const links = [
    "/dashboard/all-employee-list",
    "/dashboard/admin-payroll",
    "",
    "",
    "/dashboard/contac-message",
  ];
  return (
    <div className="p-5 space-y-6">
      <h2 className="text-2xl font-semibold text-primary">Welcome Admin!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <Link to={links[index]}>
            <div
              key={card.id}
              className="bg-gray-300 dark:bg-gray-700 rounded-xl shadow-md p-4 flex h-full flex-col items-center group-hover:scale-110 transition justify-center text-center"
            >
              <div>{card.icon}</div>
              <h4 className="text-lg font-medium mt-2">{card.title}</h4>
              <p className="text-2xl font-bold text-primary">{card.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
