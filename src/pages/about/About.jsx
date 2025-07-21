import React from "react";
import TeamGrid from "./TeamGrid";
import { NavLink } from "react-router";

const About = () => {
  return (
    <div className="px-4 md:px-12 lg:px-24 py-10 space-y-16  text-gray-800 dark:text-gray-200 transition-all duration-300">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          About <span className=" text-primary">WorkSync</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your smart solution for managing employees, tracking productivity, and
          simplifying HR operations.
        </p>
      </section>

      {/* What is WorkSync */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-secondary dark:text-blue-300">
          What is WorkSync?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          WorkSync is a full-featured employee management platform that
          streamlines work assignments, payroll, attendance, and more. Designed
          for small to mid-sized businesses to efficiently manage their team.
        </p>
      </section>

      {/* Mission */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-secondary dark:text-blue-300">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          To empower businesses with efficient tools that help track employee
          work progress, manage HR tasks, and maintain payroll records — all in
          one place.
        </p>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-secondary dark:text-blue-300">
          Core Features
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>Role-based Dashboard (Admin, HR, Employee)</li>
          <li>Attendance Tracking & Reporting</li>
          <li>Payroll and Salary Management</li>
          <li>Employee Work Sheet and Daily Logs</li>
          <li>Secure Login with Firebase Authentication</li>
          <li>Responsive and User-friendly Interface</li>
        </ul>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-secondary dark:text-blue-300">
          Meet Our Team
        </h2>
        <TeamGrid />
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-secondary dark:text-blue-300">
          Why Choose WorkSync?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We believe in simplicity, efficiency, and results. Our system is
          crafted to reduce manual tasks, improve employee visibility, and help
          you focus on growing your business.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 dark:text-blue-200">
          Ready to boost your team's productivity?
        </h2>

        <NavLink to="/dashboard">
          <button className="bg-primary  text-white px-6 py-2 rounded hover:bg-primary-focus dark:hover:bg-primary/95 transition">
           Get Started
          </button>
        </NavLink>
      </section>
    </div>
  );
};

export default About;
