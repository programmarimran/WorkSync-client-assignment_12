import DashboardHambarger from "./DashboardHambarger";
import ThemeToggle from "../themeToggle/ThemeToggle";
import DashboardNavProfile from "./DashboardNavProfile";
import Logo from "../logo/Logo";
const DashboardNavbar = () => {
  return (
    <div className="navbar  p-0 justify-between">
      {/* Navbar Start */}
      <div className=" flex items-center">
        <div className=" lg:hidden">
          <DashboardHambarger></DashboardHambarger>
        </div>
        <div className=" flex gap-1 items-center">
          <Logo />
          <h2 className=" md:hidden font-poppins text-lg -ml-2 md:text-3xl font-bold">
            Work<span className="text-primary text-xl md:text-4xl">S</span>ync
          </h2>
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
