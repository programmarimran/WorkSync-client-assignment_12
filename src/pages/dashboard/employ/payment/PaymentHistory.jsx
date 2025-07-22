import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/works/payment-history/${user?.email}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Payment History
      </h2>

      <div className="overflow-x-auto rounded-md ">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr className=" bg-primary/20 ">
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{item.month}</td>
                <td className="px-4 py-2">{item.year}</td>
                <td className="px-4 py-2">${item.salary}</td>
                <td className="px-4 py-2">{item.transactionId}</td>
                <td className="px-4 py-2">
                  {new Date(item.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="btn btn-sm border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="btn btn-sm border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          disabled={page >= data.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
