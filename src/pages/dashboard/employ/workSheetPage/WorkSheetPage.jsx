import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingPage from "../../../../components/Loadingpage";

const WorkSheetPage = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentEditWork, setCurrentEditWork] = useState(null);
  const [editSelectedDate, setEditSelectedDate] = useState(new Date());

  const { register, handleSubmit, reset } = useForm();
  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm();

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["works", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/works?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  const addWorkMutation = useMutation({
    mutationFn: (newWork) => axiosSecure.post("/works", newWork),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user.email]);
      reset();
      setSelectedDate(new Date());
    },
  });

  const updateWorkMutation = useMutation({
    mutationFn: ({ id, updatedWork }) =>
      axiosSecure.patch(`/works/${id}`, updatedWork),
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
    const work = {
      ...data,
      hours: Number(data.hours),
      date: selectedDate,
      email: user.email,
    };
    addWorkMutation.mutate(work);
  };

  const handleEdit = (work) => {
    setCurrentEditWork(work);
    editReset({ task: work.task, hours: work.hours });
    setEditSelectedDate(new Date(work.date));
    setEditModalIsOpen(true);
  };

  const onEditSubmit = (data) => {
    const updatedWork = {
      ...data,
      hours: Number(data.hours),
      date: editSelectedDate,
      email: user.email,
    };
    updateWorkMutation.mutate({ id: currentEditWork._id, updatedWork });
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-xl shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-center">Task</th>
            <th className="text-center">Hours</th>
            <th className="text-center">Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-4 gap-2 items-center"
              >
                <select
                  {...register("task")}
                  required
                  className="border p-2 rounded bg-transparent dark:bg-gray-600 dark:border-gray-600"
                >
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-work">Paper-work</option>
                </select>
                <input
                  type="number"
                  {...register("hours", { required: true, min: 0 })}
                  placeholder="Hours Worked"
                  className="border p-2 rounded bg-transparent dark:border-gray-600"
                />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="border p-2 rounded w-full bg-transparent dark:border-gray-600"
                />
                <button
                  type="submit"
                  disabled={addWorkMutation.isLoading}
                  className="btn btn-primary w-full"
                >
                  {addWorkMutation.isLoading ? "Adding..." : "Add"}
                </button>
              </form>
            </td>
          </tr>
          {works.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No work entries found.
              </td>
            </tr>
          )}
          {works.map((work) => (
            <tr key={work._id}>
              <td className="text-center">{work.task}</td>
              <td className="text-center">{work.hours}</td>
              <td className="text-center">
                {new Date(work.date).toLocaleDateString()}
              </td>
              <td className="text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="btn dark:bg-gray-600 btn-xs"
                    onClick={() => handleEdit(work)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteWorkMutation.mutate(work._id)}
                    disabled={deleteWorkMutation.isLoading}
                  >
                    {deleteWorkMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        type="checkbox"
        id="edit-modal"
        className="modal-toggle"
        checked={editModalIsOpen}
        onChange={() => setEditModalIsOpen(!editModalIsOpen)}
      />
      <div className="modal">
        <div className="modal-box bg-white dark:bg-gray-900">
          <form
            onSubmit={handleEditSubmit(onEditSubmit)}
            className="flex flex-col gap-4"
          >
            <select
              {...editRegister("task")}
              required
              className="select select-bordered bg-transparent dark:bg-gray-700"
            >
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
              <option value="Paper-work">Paper-work</option>
            </select>
            <input
              type="number"
              {...editRegister("hours", { required: true, min: 0 })}
              placeholder="Hours Worked"
              className="input input-bordered bg-transparent dark:bg-gray-700"
            />
            {/* <DatePicker
              selected={editSelectedDate}
              onChange={(date) => setEditSelectedDate(date)}
              className="input input-bordered w-full bg-transparent dark:bg-gray-700"
            /> */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border p-2 rounded w-full bg-transparent dark:border-gray-600"
              popperPlacement="bottom-start"
              popperClassName="datepicker-popper"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary bg-primary flex-1"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditModalIsOpen(false)}
                className="btn flex-1 dark:text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkSheetPage;
