import { Home, LayoutDashboard, MessageCircle } from "lucide-react";
import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";

const Footer = () => {
  const { setFooterEmail } = useAuth();
  const emailRef = useRef();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleEmail = () => {
    scrollToTop()
    setFooterEmail(emailRef.current.value);
  };
  return (
    <footer className="bg-neutral text-neutral-content px-6 py-10 ">
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + Contact */}
        <div className="space-y-4">
          <div className=" flex items-center">
            <Logo></Logo>
            <h2 className=" md:hidden font-poppins -ml-2 text-3xl font-bold">
              Work<span className="text-primary text-4xl">S</span>ync
            </h2>
          </div>

          <div>
            <div className=" hidden xl:block bg-gray-50 dark:bg-gray-600 dark:text-white text-gray-900 rounded-2xl py-2 my-4 px-6">
              <p className="mb-2 dark:text-gray-300">
                📍 Address: Sector 1, Gazipur, Dhaka, Bangladesh
              </p>
              <p className="mb-2 dark:text-gray-300">
                📞 Phone: +8801715994657
              </p>
              <p className="mb-4 dark:text-gray-300 break-words">
                ✉️ Email: infosponsor2@gmail.com
              </p>
            </div>
            <div className=" xl:hidden">
              <p className="mb-2 dark:text-gray-300">
                📍 Address: Sector 1, Gazipur, Dhaka, Bangladesh
              </p>
              <p className="mb-2 dark:text-gray-300">
                📞 Phone: +8801715994657
              </p>
              <p className="mb-4 dark:text-gray-300 break-words">
                ✉️ Email: infosponsor2@gmail.com
              </p>
            </div>
            <iframe
              title="company-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.0724395465846!2d90.39838371499067!3d23.92114738451371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e7dc1a3b7c03%3A0x9cf0d63bbfd507cf!2sGazipur!5e0!3m2!1sen!2sbd!4v1660928947923!5m2!1sen!2sbd"
              className="w-[100%] h-40 rounded-lg border dark:border-gray-700"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Explore */}
        <div className=" md:flex flex-col  items-center">
          <h4 className="text-lg font-extrabold  md:-ml-14 mb-2">Links</h4>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " font-bold text-white  flex items-center gap-1"
                    : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
                }
              >
                <Home size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? " font-bold text-white  flex items-center gap-1"
                    : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
                }
              >
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? " font-bold text-white  flex items-center gap-1"
                    : "flex hover:bg-primary/90 hover:text-white  items-center gap-1"
                }
              >
                <MessageCircle size={18} /> Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-24">
          {/* Social Icons */}
          <div className=" space-y-6">
            <h4 className="text-lg font-bold">Connect Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/mdimran.hasan.79827803"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-800 text-white p-3 rounded-full transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/imranhasan72751"
                target="_blank"
                rel="noreferrer"
                className="bg-sky-500 hover:bg-sky-700 text-white p-3 rounded-full transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/programmarimran/"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-700 hover:bg-blue-900 text-white p-3 rounded-full transition duration-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-800 text-white p-3 rounded-full transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className=" space-y-6">
            <h4 className="text-lg font-bold">Our Newsletter</h4>
            <p>Enter your email and we contact you!</p>
            <div className="flex">
              <input
                type="email"
                ref={emailRef}
                placeholder="Your Email Address"
                className="input input-bordered bg-[#313036f8] w-full rounded-r-none "
              />
              <Link to={"/contact-us"}>
                <button
                  onClick={handleEmail}
                  className="btn btn-primary rounded-l-none"
                >
                  Send
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="  border-t border-gray-700 pt-4 mt-6 ">
        <p className=" text-center">© 2025 WorkSync. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
