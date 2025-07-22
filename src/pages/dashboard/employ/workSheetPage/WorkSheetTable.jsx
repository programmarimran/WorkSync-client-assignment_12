import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";

const WorkSheetTable = ({ works, onEdit, onDelete, deleteLoading }) => {
  const columns = useMemo(() => [
    { header: "Task", accessorKey: "task" },
    { header: "Hours", accessorKey: "hours" },
    { header: "Date", accessorKey: "submittedAt",
      cell: ({ row }) => new Date(row.original.submittedAt).toLocaleDateString()
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row.original)} className="btn btn-xs text-black">Edit</button>
          <button onClick={() => onDelete(row.original._id)} className="btn btn-xs btn-error" disabled={deleteLoading}>
            {deleteLoading ? "..." : "Delete"}
          </button>
        </div>
      ),
    },
  ], [onEdit, onDelete, deleteLoading]);

  const table = useReactTable({
    data: works,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className=" bg-primary/20 " key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheetTable;
