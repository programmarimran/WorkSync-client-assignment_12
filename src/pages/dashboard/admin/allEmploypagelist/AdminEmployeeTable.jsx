import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminEmployeeTable = ({ tebLevel }) => {
  // console.log(tebLevel);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["all-verified-employees", tebLevel],
    queryFn: async () => {
      const res = await axiosSecure.get(
        tebLevel == 1 ? "/admin/all-verified-employees" : "/admin/all-hr"
      );
      return res.data;
    },
    enabled: !!tebLevel,
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [fireModalOpen, setFireModalOpen] = useState(false);
  const [newSalary, setNewSalary] = useState(0);

  const fireMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/admin/fire-employee/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["all-verified-employees"]),
  });

  const makeHrMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/admin/make-hr/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["all-verified-employees"]),
  });

  const adjustSalaryMutation = useMutation({
    mutationFn: async ({ id, salary }) =>
      await axiosSecure.patch(`/admin/adjust-salary/${id}`, {
        newSalary: salary,
      }),
    onSuccess: () => queryClient.invalidateQueries(["all-verified-employees"]),
  });

  if (isLoading)
    return tebLevel == 1 ? (
      <p className="text-center">Loading Employees...</p>
    ) : (
      <p className="text-center">Loading HR...</p>
    );
  if (employees.length < 1 && tebLevel == 1) {
    return <p className="text-center">Employee not found</p>;
  }
  if (employees.length < 1 && tebLevel == 2) {
    return <p className="text-center">HR not found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Make HR</th>
            <th>Adjust Salary</th>
            <th>Fire</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>${emp.salary}</td>
              <td>
                {emp.role === "Employee" && !emp.isFired ? (
                  <button
                    onClick={() => makeHrMutation.mutate(emp._id)}
                    className="btn btn-xs"
                  >
                    Make HR
                  </button>
                ) : (
                  "Already HR"
                )}
              </td>
              <td>
                {!emp.isFired && (
                  <button
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setSalaryModalOpen(true);
                    }}
                    className="btn btn-xs btn-info"
                  >
                    Adjust
                  </button>
                )}
              </td>
              <td>
                {emp.isFired ? (
                  <span className="text-red-500">Fired</span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setFireModalOpen(true);
                    }}
                    className="btn btn-xs btn-error"
                  >
                    Fire
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {fireModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to fire {selectedEmployee?.name}?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  fireMutation.mutate(selectedEmployee._id);
                  setFireModalOpen(false);
                }}
                className="btn btn-error"
              >
                Confirm Fire
              </button>
              <button
                onClick={() => setFireModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {salaryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Adjust Salary for {selectedEmployee?.name}
            </h2>
            <input
              type="number"
              className="input input-bordered w-full mb-4"
              value={newSalary}
              onChange={(e) => setNewSalary(Number(e.target.value))}
              placeholder="Enter New Salary"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  adjustSalaryMutation.mutate({
                    id: selectedEmployee._id,
                    salary: newSalary,
                  });
                  setSalaryModalOpen(false);
                }}
                className="btn btn-info"
              >
                Update Salary
              </button>
              <button
                onClick={() => setSalaryModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeTable;
