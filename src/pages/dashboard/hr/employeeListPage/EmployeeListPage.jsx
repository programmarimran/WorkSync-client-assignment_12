
import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import PaymentModal from "./PaymentModal";

const EmployeeListPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(selectedEmployee)
  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <EmployeeTable handlePayClick={handlePayClick} />
      <PaymentModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeListPage;