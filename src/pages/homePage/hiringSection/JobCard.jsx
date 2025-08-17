import { Link } from "react-router";
import img from "../../../assets/logo.png"

const JobCard = ({ job }) => {
  // SVG Icons for better UI
  const LocationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-1 inline-block text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-1 inline-block text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 hover:shadow-lg  hover:-translate-y-1">
      {/* Card Header */}
      <div className="flex items-center mb-4">
        <img
          src={img}
          alt={`${job.company.name} logo`}
          className="w-14  rounded-md object-cover border border-gray-100 dark:border-gray-600"
        
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {job.company}
          </p>
        </div>
      </div>

      {/* Job Meta Info */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <div className="flex items-center">
          <LocationIcon />
          <span>{job.company.location}</span>
        </div>
        <div className="flex items-center">
          <BriefcaseIcon />
          <span>
            {job.jobType}
          </span>
        </div>
      </div>

      {/* Salary and See More Button */}
      <div className="mt-auto pt-4 flex justify-between items-center">
        <p className="text-md font-semibold text-green-600 dark:text-green-400">
          {job.salaryRange.split(" ")[0]} - {job.salaryRange.split(" ")[2]}
        </p>
        <Link to={`/job-details/${job.id}`}>
        
        <button className="bg-primary/70 btn btn-sm hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary text-white  font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
          View Details
        </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
