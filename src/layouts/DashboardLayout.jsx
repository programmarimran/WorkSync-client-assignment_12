import React from "react";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { roleLoading,role } = useUserRole();
  console.log("loading et type ki :",roleLoading,"role hoise:",role);
  return <div>this is DashboardLayout</div>;
};

export default DashboardLayout;
