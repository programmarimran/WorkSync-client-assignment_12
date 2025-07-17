import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const ProgressFilter = ({
  selectedEmployee,
  setEmployeeNames,
  setEmployee,
  selectedMonth,
  setMonth,
}) => {
  const axiosSecure = useAxiosSecure();
  const { data: employees = [] } = useQuery({
    queryKey: ["employees-dropdown"],
    queryFn: async () => (await axiosSecure.get("/hr/employees")).data,
  });
  useEffect(() => {
    setEmployeeNames(employees);
  }, [employees]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={selectedEmployee}
        onChange={(e) => setEmployee(e.target.value)}
        className="select select-bordered"
      >
        <option value="">All Employees</option>
        {employees.map((emp) => (
          <option key={emp.email} value={emp.email}>
            {emp.name}
          </option>
        ))}
      </select>

      <select
        value={selectedMonth}
        onChange={(e) => setMonth(e.target.value)}
        className="select select-bordered"
      >
        <option value="">All Months</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgressFilter;
