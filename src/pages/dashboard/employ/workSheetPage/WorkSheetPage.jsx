import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import WorkSheetTable from "./WorkSheetTable";
import WorkEditModal from "./WorkEditModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkSheetPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [task, setTask] = useState("");
  const [hours, setHours] = useState(0);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentEditWork, setCurrentEditWork] = useState(null);

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["works", user.email],
    queryFn: async () => (await axiosSecure.get(`/works?email=${user.email}`)).data,
    enabled: !!user.email,
  });

  const addWorkMutation = useMutation({
    mutationFn: (newWork) => axiosSecure.post("/works", newWork),
    onSuccess: () => {
      queryClient.invalidateQueries(["works", user.email]);
      setTask("");
      setHours(0);
      setSelectedDate(new Date());
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

  const handleAddWork = (e) => {
    e.preventDefault();
    addWorkMutation.mutate({
      task,
      hours: Number(hours),
      date: selectedDate,
      email: user.email,
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
      <form onSubmit={handleAddWork} className="grid grid-cols-4 gap-2">
        <select value={task} onChange={(e) => setTask(e.target.value)} className="input input-bordered">
          <option value="">Select Task</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          className="input input-bordered"
        />
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="input input-bordered" />
        <button type="submit" className="btn btn-primary">{addWorkMutation.isLoading ? "Adding..." : "Add"}</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <WorkSheetTable works={works} onEdit={handleEdit} onDelete={handleDelete} deleteLoading={deleteWorkMutation.isLoading} />
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
