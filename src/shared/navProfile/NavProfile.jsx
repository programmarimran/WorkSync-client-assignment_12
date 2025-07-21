// import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router";
import useScrollLevel from "../../hooks/usescrollLevel";

const NavProfile = ({ user, logoutUser }) => {
  // const user=true
    const level = useScrollLevel([70, 400]);
    const textClasses = [
      "text-primary border hover:bg-primary hover:text-white  border-primary",
      "text-primary border hover:bg-primary hover:text-white  border-primary",
      "border-white dark:border-white text-white hover:bg-primary hover:text-white"
    ];
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      {user ? (
        <>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle "
            >
              <div className="tooltip tooltip-bottom rounded-full bg-gray-200">
                <div className="tooltip-content">
                  {/* <div
                    className={"animate-bounce text-orange-400 text-lg font-black break-words"}
                  >
                    {user ? user.displayName : ""}
                  </div> */}
                </div>
                <div className="avatar">
                  <div className="ring-[#2F80ED] ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu border dropdown-content bg-base-300 rounded-2xl px-4 py-2"
            >
              <li className=" w-full">
                <h1 className=" whitespace-nowrap w-full text-lg font-bold">
                  {user.displayName}
                </h1>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary bg-gray-950 border-none shadow-none"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className=" flex items-center gap-2">
        <div className=" hidden md:flex">
            <Link to={"/register"}>
            <button className= {`${textClasses[level]} btn btn-outline`}>
              Register
            </button>
          </Link>
        </div>
          <Link to={"/login"}>
            {" "}
            <button className=" btn bg-primary text-white btn-outline">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavProfile;
