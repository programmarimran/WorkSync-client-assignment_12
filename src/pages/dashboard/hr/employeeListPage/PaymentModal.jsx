import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const PaymentModal = ({ isOpen, setIsOpen, employee }) => {
  const [selectedYear, setSelectedYear] = useState(new Date());
  const year = selectedYear.getFullYear();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post("/hr/payroll", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsOpen(false);
      reset();
      Swal.fire("Payroll success");
    },
    onError: (error) => {
      // console.error(error);
      Swal.fire(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      employeeId: employee._id,
      employeeEmail: employee.email,
      bank_account_no: employee.bank_account_no,
      salary: employee.salary,
      month: parseInt(formData.month),
      year: year,
      submittedAt: new Date(),
    };
    mutation.mutate(payload);
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Pay {employee.name}
        </h3>
        <input
          value={employee.salary}
          readOnly
          className="input input-bordered w-full bg-base-100 text-black dark:text-white "
        />
        <select
          {...register("month", { required: true })}
          className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">Select Month</option>
          {[...Array(12)].map((_, i) => {
            const value = String(i + 1).padStart(2, "0");
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>

        <DatePicker
          selected={selectedYear}
          onChange={(date) => setSelectedYear(date)}
          showYearPicker
          dateFormat="yyyy"
          className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-sm bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-primary">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;
