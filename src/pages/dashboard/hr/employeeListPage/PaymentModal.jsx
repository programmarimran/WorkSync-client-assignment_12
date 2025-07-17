import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentModal = ({ isOpen, setIsOpen, employee }) => {
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
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      employeeId: employee._id,
      employeeEmail: employee.email,
      salary: employee.salary,
      month: formData.month,
      year: formData.year,
    };
    mutation.mutate(payload);
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <h3 className="text-lg font-bold">Pay {employee.name}</h3>
        <input
          value={employee.salary}
          disabled
          className="input input-bordered w-full"
        />
        <input
          {...register("month", { required: true })}
          placeholder="Month"
          className="input input-bordered w-full"
        />
        <input
          {...register("year", { required: true })}
          placeholder="Year"
          className="input input-bordered w-full"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-sm"
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
