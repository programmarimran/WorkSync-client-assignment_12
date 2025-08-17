import img from "../../../assets/logo.png"
import { Link, useParams } from "react-router";
import { jobs } from "../../../assets/hiringData";

const JobDetails = () => {
  const { id } = useParams();
  const jobsData = jobs;
  // Check if the job data matches the id
  const jobData = jobsData.find((job) => job.id == id);
  if (jobData.id !== id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Job Not Found</h1>
          <p className="text-gray-600">No job found with the provided ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <img
            src={img}
            alt={`${jobData.title} Icon`}
            className="w-24 mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {jobData.title}
            </h1>
            <p className="text-lg text-gray-600">{jobData.company}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{jobData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Job Details
            </h2>
            <p>
              <span className="font-medium">Location:</span> {jobData.location}
            </p>
            <p>
              <span className="font-medium">Job Type:</span> {jobData.jobType}
            </p>
            <p>
              <span className="font-medium">Salary Range:</span>{" "}
              {jobData.salaryRange}
            </p>
            <p>
              <span className="font-medium">Experience:</span>{" "}
              {jobData.experience}
            </p>
            <p>
              <span className="font-medium">Employment Type:</span>{" "}
              {jobData.employmentType}
            </p>
            <p>
              <span className="font-medium">Posted Date:</span>{" "}
              {jobData.postedDate}
            </p>
            <p>
              <span className="font-medium">Application Deadline:</span>{" "}
              {jobData.applicationDeadline}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Benefits
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {jobData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {jobData.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Qualifications
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {jobData.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
        </div>

        <div className="text-center">
         <Link to={"/dashboard"}>
          <button className="btn btn-primary">
            Apply Now
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
