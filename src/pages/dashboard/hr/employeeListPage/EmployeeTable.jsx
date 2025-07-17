import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EmployeeTable = ({ handlePayClick }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await axiosSecure.get("/hr/employees")).data,
  });

  const verifyMutation = useMutation({
    mutationFn: async ({ id, isVerified }) => {
      return await axiosSecure.patch(`/hr/employee-verify/${id}`, { isVerified });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const columns = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      {
        header: "Verified",
        cell: ({ row }) => (
          <button
            onClick={() =>
              verifyMutation.mutate({
                id: row.original._id,
                isVerified: !row.original.isVerified,
              })
            }
            className="btn btn-xs"
          >
            {row.original.isVerified ? "✅" : "❌"}
          </button>
        ),
      },
      { header: "Bank Account", accessorKey: "bank_account_no" }, 
      { header: "Salary", accessorKey: "salary" },
      {
        header: "Pay",
        cell: ({ row }) => (
          <button
            disabled={!row.original.isVerified}
            onClick={() => handlePayClick(row.original)}
            className="btn btn-xs btn-primary"
          >
            Pay
          </button>
        ),
      },
    ],
    [verifyMutation, handlePayClick]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
