import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import WorkSheetTable from "./WorkSheetTable";
import WorkEditModal from "./WorkEditModal";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const WorkSheetPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentEditWork, setCurrentEditWork] = useState(null);

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["works", user.email],
    queryFn: async () => (await axiosSecure.get(`/works?email=${user.email}`)).data,
    enabled: !!user.email,
  });

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      task: "",
      hours: "",
      submittedAt: new Date(),
    },
  });

  const addWorkMutation = useMutation({
    mutationFn: (newWork) => axiosSecure.post("/works", newWork),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user.email]);
      reset({ task: "", hours: "", submittedAt: new Date() });
    },
  });

  const updateWorkMutation = useMutation({
    mutationFn: ({ id, updatedWork }) => axiosSecure.patch(`/works/${id}`, updatedWork),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user.email]);
      setEditModalIsOpen(false);
    },
  });

  const deleteWorkMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/works/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["works", user.email]),
  });

  const onSubmit = (data) => {
    addWorkMutation.mutate({
      task: data.task,
      hours: Number(data.hours),
      submittedAt: data.submittedAt,
      email: user.email,
      month: new Date(data.submittedAt).getMonth(),
      year: new Date(data.submittedAt).getFullYear(),
    });
  };

  const handleEdit = (work) => {
    setCurrentEditWork(work);
    setEditModalIsOpen(true);
  };

  const handleUpdate = (updatedWork) => {
    updateWorkMutation.mutate({ id: currentEditWork._id, updatedWork });
  };

  const handleDelete = (id) => {
    deleteWorkMutation.mutate(id);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <select {...register("task", { required: true })} className="input input-bordered">
          <option value="">Select Task</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>

        <input
          type="number"
          {...register("hours", { required: true, min: 0 })}
          placeholder="Hours"
          className="input input-bordered"
        />

        <Controller
          control={control}
          name="submittedAt"
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="input input-bordered"
            />
          )}
        />

        <button type="submit" className="btn btn-primary">
          {addWorkMutation.isLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <WorkSheetTable
          works={works}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleteLoading={deleteWorkMutation.isLoading}
        />
      )}

      <WorkEditModal
        isOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        currentEditWork={currentEditWork}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default WorkSheetPage;
