import { useCallback, useState } from "react";
import ProgressTable from "./ProgressTable";
import { useQuery } from "@tanstack/react-query";
import ProgressFilter from "./Progressfilter";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ProgressPage = () => {
  const axiosSecure = useAxiosSecure();
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const handleSetEmployeeNames = useCallback((names) => {
    setEmployeeNames(names);
  }, []);
  const { data = [], isLoading } = useQuery({
    queryKey: ["progress", employee, month],
    queryFn: async () =>
      (
        await axiosSecure.get(
          `/hr/progress?employee=${employee}&month=${month}`
        )
      ).data,
  });

  const totalHours = data.reduce((sum, item) => sum + (item.hours || 0), 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Work Progress</h2>
      <ProgressFilter
        setEmployeeNames={handleSetEmployeeNames}
        selectedEmployee={employee}
        setEmployee={setEmployee}
        selectedMonth={month}
        setMonth={setMonth}
      />
      <div className="my-4">
        <p className="font-semibold">Total Work Hours: {totalHours}</p>
      </div>
      <ProgressTable
        employeeNames={employeeNames}
        data={data}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProgressPage;
