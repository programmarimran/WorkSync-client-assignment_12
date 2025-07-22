const ProgressTable = ({ data, isLoading, employeeNames }) => {
  if (isLoading) return <p>Loading work records...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          <tr className=" bg-primary/20 ">
            <th>Employee</th>
            <th>Email</th>
            <th>Month</th>
            <th>Year</th>
            <th>Hours</th>
            <th>Work Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const employee = employeeNames?.find(
              (name) => name.email === item.email
            );
            return (
              <tr key={index}>
                <td>{employee?.name || "Unknown"}</td>
                <td>{item.email}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>{item.hours}</td>
                <td>{item.task}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;
