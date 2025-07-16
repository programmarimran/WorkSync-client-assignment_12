import React, { } from "react";
import useAuth from "../../hooks/useAuth";
const DashboardResponsiveDrawer = ({ links, handleHambargar, active }) => {
  const { user } = useAuth()
  return (
    <div className="drawer lg:drawer-open bg-base-300 dark:bg-slate-900 shadow">
      {/* <input id="my-drawer-2" type="checkbox" className="drawer-toggle" /> */}
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={active}
        onChange={handleHambargar}
      />

      <div className="drawer-content">
        <div onClick={handleHambargar}>
          <button tabIndex={0} role="button" className=" lg:hidden">
            {active ? (
              <>
                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </>
            ) : (
              <>
                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-[70vw] max-w-80 p-4  h-[calc(100vh-73px)] mt-[73px] overflow-y-auto">
         
          <div className="mb-4 text-center">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-16 h-16 mx-auto rounded-full border-2 border-primary"
              />
            )}
            <h2 className="text-lg font-semibold mt-2">
              {user?.displayName || "User Name"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="divider"></div>

          {links}
        </ul>
      </div>
    </div>
  );
};

export default DashboardResponsiveDrawer;