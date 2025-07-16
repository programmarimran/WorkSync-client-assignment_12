import DashboardHambarger from "./DashboardHambarger";
import ThemeToggle from "../themeToggle/ThemeToggle";
import DashboardNavProfile from "./DashboardNavProfile";
const DashboardNavbar = () => {
  return (
    <div className="navbar  p-0 justify-between">
      {/* Navbar Start */}
      <div className=" ">
        <div className=" lg:hidden">
          <DashboardHambarger></DashboardHambarger>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2 md:gap-3">
        <ThemeToggle />

        <DashboardNavProfile></DashboardNavProfile>
      </div>
    </div>
  );
};

export default DashboardNavbar;
