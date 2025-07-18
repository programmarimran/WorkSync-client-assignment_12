import { useState } from "react";
import AdminEmployeeTable from "./AdminEmployeeTable";
import AdminEmployeeCardGrid from "./AdminEmployeeCardGrid";
import TabNavigation from "./TabNavigation";
import { FaAngleRight } from "react-icons/fa";

const AllEmployeeListPage = () => {
  const [viewMode, setViewMode] = useState("table");
  const [tebLevel, setTabLevel] = useState(1);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-xl font-bold">All Verified Employees</h2> */}
        <div></div>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="btn btn-sm btn-primary"
        >
          {viewMode === "table" ? "Card View" : "Table View"}
          <FaAngleRight size={20} />
        </button>
      </div>
      <div className=" mb-4">
        <TabNavigation setTabLevel={setTabLevel} />
      </div>

      {viewMode === "table" ? (
        <AdminEmployeeTable tebLevel={tebLevel} />
      ) : (
        <AdminEmployeeCardGrid tebLevel={tebLevel} />
      )}
    </div>
  );
};

export default AllEmployeeListPage;
