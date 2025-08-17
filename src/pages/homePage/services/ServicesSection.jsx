import { useState } from "react";
import iconMap from "./iconMap";

const ServicesSection = ({ services }) => {
    const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 8);
  return (
    <section className="py-10 px-4 md:px-10 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-base-content">
          Our <span className="text-primary">Services</span>
        </h2>
        <p className="text-center text-base-content mb-10 max-w-2xl mx-auto">
          Explore the professional services we offer to manage your workforce
          efficiently.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedServices?.map((service) => (
            <div  data-aos="zoom-in-down"
              key={service._id}
              className="bg-primary/5 dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 flex flex-col transition-all  hover:shadow-lg hover:border-primary/20 hover:scale-100 duration-75 hover:-translate-y-1"
            >
              <div className="card-body items-center text-center">
                <div className="mb-3">
                  {iconMap[service.icon] || (
                    <FaUserPlus className="text-primary hover:text-red-600 text-3xl" />
                  )}
                </div>
                <h3 className="card-title text-base-content">
                  {service.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
          {services.length > 8 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline btn-primary"
            >
              {showAll ? "See Less" : "See All Services"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
