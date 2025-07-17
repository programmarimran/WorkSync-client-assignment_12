import { useParams } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EmployeeDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["employee-details", slug],
    queryFn: async () => (await axiosSecure.get(`/hr/employees/${slug}`)).data,
  });

  if (isLoading)
    return (
      <motion.h2
        className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading employee details.....
      </motion.h2>
    );

  // const { employee, payments } = data;
  const payments = data?.payments;
  const employee = data?.employee;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = payments?.map((item) => {
    const monthName = monthNames[item.month - 1];
    return {
      month: `${monthName}/${item.year}`,
      salary: item.amount || employee?.salary,
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 items-center mb-4">
        <img
          src={employee?.photo}
          alt={employee?.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee?.name}</h2>
          <p className="text-sm text-gray-600">
            {employee?.designation || "Employee"}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2">Salary History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            label={{
              value: "Month/Year",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Salary", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="salary">
            {chartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  [
                    "#8884d8", // Jan
                    "#82ca9d", // Feb
                    "#ffc658", // Mar
                    "#ff8042", // Apr
                    "#8dd1e1", // May
                    "#a4de6c", // Jun
                    "#d0ed57", // Jul
                    "#ffc0cb", // Aug
                    "#ffbb28", // Sep
                    "#00C49F", // Oct
                    "#FF8042", // Nov
                    "#0088FE", // Dec
                  ][
                    entry.month.split("/")[0] === "Jan"
                      ? 0
                      : monthNames?.indexOf(entry.month.split("/")[0])
                  ]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeDetailsPage;
