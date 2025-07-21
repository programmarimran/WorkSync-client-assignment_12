import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

const EmployeeAttendance = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  const [myAttendance, setMyAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const todayDate = new Date().toLocaleDateString();

  // ✅ Attendance Post Function
  const handleAttendance = async () => {
    const attendanceData = {
      uid: user?.uid,
      email: user?.email,
      role: "Employee",
      date: todayDate,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/attendance", attendanceData);
      if (res.data?.insertedId) {
        toast.success("✅ Attendance submitted!");
        fetchMyAttendance(); // রিফ্রেশ
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("❌ Already submitted or error!");
    }
  };

  // ✅ Load Own Attendance
  const fetchMyAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await axiosSecure.get(`/attendance/my?uid=${user?.uid}`);
      setMyAttendance(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't fetch your attendance");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchMyAttendance();
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">🎯 My Attendance</h2>

      {/* ✅ Give Attendance Button */}
      <button
        onClick={handleAttendance}
        className="btn btn-success mb-6"
      >
        Give Attendance for {todayDate}
      </button>

      {/* ✅ Attendance Table */}
      {isLoading ? (
        <p>Loading attendance...</p>
      ) : myAttendance.length ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {myAttendance.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{entry.date}</td>
                  <td>{new Date(entry.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attendance found.</p>
      )}
    </div>
  );
};

export default EmployeeAttendance;
