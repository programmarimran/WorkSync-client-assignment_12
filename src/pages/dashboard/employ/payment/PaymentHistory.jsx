import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const fetchPaymentHistory = async ({ pageParam = 1 }) => {
    const res = await axiosSecure.get(`/works/payment-history?page=${pageParam}&limit=5`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["payment-history"],
    queryFn: fetchPaymentHistory,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap(p => p.payments).length;
      if (totalFetched < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Month, Year</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.pages.map(page =>
              page.payments.map(payment => (
                <tr key={payment.transactionId}>
                  <td>{payment.month}, {payment.year}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="text-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            className="btn btn-primary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
