import React from 'react';
import { jobs } from '../../../assets/hiringData';
import JobCard from './JobCard';


const HiringSection = () => {
    const jobsData=jobs
    return (
         <div className=" p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Available Job Openings</h1>
        {/* Responsive Grid Layout for Job Cards */}
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobsData.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
    );
};

export default HiringSection;