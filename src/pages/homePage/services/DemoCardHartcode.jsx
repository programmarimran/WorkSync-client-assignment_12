// Main App Component to render a list of cards
export default function DemoEmployeeCard() {
  // Sample data for multiple jobs
  const jobs = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: { name: "Tech Innovators", logoUrl: "https://placehold.co/60x60/7E22CE/FFFFFF?text=TI", location: "Dhaka, Bangladesh" },
        jobType: "Full-time",
        workplaceModel: "Remote",
        salaryRange: "$500 - $800 per month"
    },
    {
        id: "2",
        title: "UI/UX Designer",
        company: { name: "Design Hub", logoUrl: "https://placehold.co/60x60/DB2777/FFFFFF?text=DH", location: "Chittagong, Bangladesh" },
        jobType: "Full-time",
        workplaceModel: "Hybrid",
        salaryRange: "$400 - $600 per month"
    },
    {
        id: "3",
        title: "Junior React Developer",
        company: { name: "Creative Solutions Ltd.", logoUrl: "https://placehold.co/60x60/16A34A/FFFFFF?text=CS", location: "Dhaka, Bangladesh" },
        jobType: "Internship",
        workplaceModel: "On-site",
        salaryRange: "$200 - $300 per month"
    }
  ];

  const handleViewDetails = (jobId) => {
    // In a real app, you would navigate to the details page
    // For this demo, we'll just log the ID to the console
    console.log(`Viewing details for job ID: ${jobId}`);
    // Example: window.location.href = `/jobs/${jobId}`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Available Job Openings</h1>
        {/* Responsive Grid Layout for Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} onSeeMore={handleViewDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}





import React from 'react';

// SVG Icons for better UI
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

// The new compact Job Card Component
const JobCard = ({ job, onSeeMore }) => {
  if (!job) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
      {/* Card Header */}
      <div className="flex items-center mb-4">
        <img
          src={job.company.logoUrl}
          alt={`${job.company.name} logo`}
          className="w-14 h-14 rounded-md object-cover border border-gray-100 dark:border-gray-600"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x60/EBF4FF/3B82F6?text=${job.company.name.charAt(0)}`; }}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{job.company.name}</p>
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
            <span>{job.jobType} ({job.workplaceModel})</span>
        </div>
      </div>
        
      {/* Salary and See More Button */}
      <div className="mt-auto pt-4 flex justify-between items-center">
        <p className="text-md font-semibold text-green-600 dark:text-green-400">{job.salaryRange.split(' ')[0]} - {job.salaryRange.split(' ')[2]}</p>
        <button 
          onClick={() => onSeeMore(job.id)}
          className="bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};