import React from "react";
import useUserRole from "../../../../hooks/useUserRole";

const DashboardHome = () => {
  const { role } = useUserRole();
  console.log(role);
  return <div>this is dashboard home</div>;
};

export default DashboardHome;
