import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import PaymentFormModal from "./PaymentFormModal";

const AdminPayrollPage = () => {
  const axiosSecure = useAxiosSecure();
  // const queryClient = useQueryClient();
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: payrolls = [], isLoading } = useQuery({
    queryKey: ["admin-payroll-requests"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/payroll-requests")).data,
  });



  if (isLoading) return <p>Loading...</p>;

  const handlePayClick = (item) => {
    setSelectedPayroll(item);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Payroll Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Month & Year</th>
              <th>Payment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((item) => (
              <tr key={item._id}>
                <td>{item.employeeEmail}</td>
                <td>{item.salary}</td>
                <td>
                  {item.month}/{item.year}
                </td>
                <td>
                  {item.paymentDate
                    ? new Date(item.paymentDate).toLocaleDateString()
                    : "Not Paid"}
                </td>
                <td>
                  {item.isPaid ? (
                    <button className="btn btn-xs" disabled>
                      Paid
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handlePayClick(item)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PaymentFormModal
          setShowModal={setShowModal}
          selectedPayroll={selectedPayroll}
        />
      )}
    </div>
  );
};

export default AdminPayrollPage;
