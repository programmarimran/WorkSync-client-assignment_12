import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import PaymentModal from "./PaymentModal";
import { useNavigate } from "react-router";

const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(selectedEmployee);
  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  const handleDetailsClick = (employee) => {
    // console.log(employee)
    navigate(`/dashboard/details/${employee._id}`);
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <EmployeeTable
        handleDetailsClick={handleDetailsClick}
        handlePayClick={handlePayClick}
      />
      <PaymentModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeListPage;
