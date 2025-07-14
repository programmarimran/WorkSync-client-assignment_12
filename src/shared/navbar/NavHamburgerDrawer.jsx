import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const user = {
  email: "hr@example.com",
  role: "hr", 
};

const NavHamburgerDrawer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();

  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard/all-employee-list"
      : user?.role === "hr"
      ? "/dashboard/employee-list"
      : "/dashboard/work-sheet";

  // বাইরে ক্লিক করলে Drawer বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className=" focus:outline-none"
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6 text-gray-700 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div
            ref={drawerRef}
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg p-4 space-y-4 transform transition-transform duration-300 translate-y-0"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-4 top-4 text-2xl"
            >
              ✕
            </button>

            {/* Nav Links */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact Us
            </Link>
            {user && (
              <Link
                to={dashboardLink}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavHamburgerDrawer;
