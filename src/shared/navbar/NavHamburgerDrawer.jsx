import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
const NavHamburgerDrawer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();

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
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className=" focus:outline-none"
      >
        {/* Hamburger Icon */}
        <svg
          className="w-10 h-10 text-gray-700 dark:text-white"
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
        <div className="fixed inset-0  backdrop-blur-sm z-50">
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

            {/* Nav NavLinks */}
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </NavLink>
            <NavLink
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact Us
            </NavLink>
              <NavLink
                to={"/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Dashboard
              </NavLink>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default NavHamburgerDrawer;
