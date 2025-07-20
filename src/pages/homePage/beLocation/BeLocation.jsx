import React from "react";
import location from "../../../assets/be-location-bg.png";
import bgImage from "../../../assets/drowing-employee-management.png";
import { Link } from "react-router";

const BeLocation = () => {
  return (
    <div className="py-12 rounded-xl bg-primary/90 dark:bg-primary/80">
      <div
        className=" mt-0 grid md:grid-cols-2 gap-10 items-center p-6 md:p-16 rounded-xl shadow-md"
        style={{
          backgroundImage: `url(${location})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Image Section */}
        <div>
          <img
            src={bgImage}
            alt="WorkSync Illustration"
            className="w-full max-h-[400px] object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-white space-y-5">
          <h2 className="text-2xl md:text-4xl font-bold leading-snug">
            Empowering Teams, <br /> Streamlining Workflows
          </h2>
          <p>
            WorkSync ensures seamless collaboration between employees and HR teams. 
            Monitor tasks, manage attendance, and handle payroll — all from one 
            powerful platform designed for productivity and growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard">
              <button className="btn rounded-full btn-primary">
                Join as an HR Manager
              </button>
            </Link>
           <Link to={"/contact-us"}> <button className="btn rounded-full border-white hover:bg-primary text-white btn-outline">
              Boost Your Team with WorkSync
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeLocation;
