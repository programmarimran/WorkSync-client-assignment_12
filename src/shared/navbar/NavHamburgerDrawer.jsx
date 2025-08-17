import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import useScrollToSection from "../../hooks/useSmoothScroll";
import { Home, LayoutDashboard, MessageCircle } from "lucide-react";
import { FcAbout } from "react-icons/fc";
import { LiaServicestack } from "react-icons/lia";
import { FaJoget, FaQuestion } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import useScrollLevel from "../../hooks/usescrollLevel";
const NavHamburgerDrawer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();
  const { scrollToSection } = useScrollToSection();

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

  const level = useScrollLevel([60, 400]);
  const textClasses = [
    "text-black dark:text-white ",
    "text-white   ",
    "text-white ",
  ];
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className=" focus:outline-none"
      >
        {/* Hamburger Icon */}
        <svg
          className={`w-10 h-10 ${textClasses[level]}`}
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
            className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-lg p-4 space-y-4 transform transition-transform duration-300 translate-y-0"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-4 top-4 text-2xl"
            >
              ✕
            </button>

            {/* Nav NavLinks */}
            <ul className="menu menu-vertical gap-2">
              {" "}
              <li>
                <NavLink 
                 onClick={() => setMobileMenuOpen(false)}
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white  flex items-center gap-1"
                      : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
                  }
                >
                  <Home size={18} /> Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                 onClick={() => setMobileMenuOpen(false)}
                  to="/allJob"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white  flex items-center gap-1"
                      : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
                  }
                >
                  <FaJoget size={18} /> All Jobs
                </NavLink>
              </li>
              <li>
                <NavLink 
                 onClick={() => setMobileMenuOpen(false)}
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white  flex items-center gap-1"
                      : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
                  }
                >
                  <LayoutDashboard size={18} /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                 onClick={() => setMobileMenuOpen(false)}
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white  flex items-center gap-1"
                      : "flex hover:bg-primary/90 hover:text-white  items-center gap-1"
                  }
                >
                  <MessageCircle size={18} /> Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                 onClick={() => setMobileMenuOpen(false)}
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white  flex items-center gap-1"
                      : "flex hover:bg-primary/90 hover:text-white  items-center gap-1"
                  }
                >
                  <FcAbout size={18} /> About
                </NavLink>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <button
                  onClick={() => scrollToSection("services")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <LiaServicestack size={16} /> Services
                </button>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <FaQuestion size={16} /> FAQ
                </button>
              </li>
              <li onClick={() => setMobileMenuOpen(false)}>
                <button
                  onClick={() => scrollToSection("review")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <MdRateReview size={16} /> Review
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavHamburgerDrawer;
