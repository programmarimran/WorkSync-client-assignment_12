import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const DashboardNavProfile = () => {
  const { user, logoutUser } = useAuth();
  // const user=true
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout it!",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-primary mr-1 text-white px-4 py-2 rounded",
        cancelButton: "bg-red-500 ml-1 text-white px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
          <div className="tooltip tooltip-bottom rounded-full bg-gray-200">
            <div className="tooltip-content">
              {/* <div
                    className={"animate-bounce text-orange-400 text-lg font-black break-words"}
                  >
                    {user ? user.displayName : ""}
                  </div> */}
            </div>
            <div className="avatar z-0">
              <div className="ring-[#2F80ED] ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>
          </div>
        </div>

        <ul className="menu border dropdown-content bg-base-300 rounded-2xl px-4 py-2">
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
    </div>
  );
};

export default DashboardNavProfile;
