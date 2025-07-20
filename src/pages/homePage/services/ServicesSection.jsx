import {
  FaUserPlus,
  FaWallet,
  FaTasks, // ✅ valid alternative
  FaCalendarMinus,
  FaCommentDots,
  FaStarHalfAlt,
  FaClock,
  FaChartBar,
  FaFileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ServicesSection = ({ services }) => {
  const iconMap = {
    "user-plus": <FaUserPlus className="text-primary hover:text-red-600 text-3xl" />,
    wallet: <FaWallet className="text-primary text-3xl" />,
    "list-check": <FaTasks className="text-primary text-3xl" />, 
    "calendar-minus": <FaCalendarMinus className="text-primary text-3xl" />,
    "message-circle": <FaCommentDots className="text-primary text-3xl" />,
    "star-half": <FaStarHalfAlt className="text-primary text-3xl" />,
    clock: <FaClock className="text-primary text-3xl" />,
    "bar-chart-2": <FaChartBar className="text-primary text-3xl" />,
    "file-text": <FaFileAlt className="text-primary text-3xl" />,
    "map-pin": <FaMapMarkerAlt className="text-primary text-3xl" />,
  };

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <div
              key={service._id}
              className="card bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-primary shadow-md hover:shadow-xl transition-all duration-300 border border-base-300"
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
      </div>
    </section>
  );
};

export default ServicesSection;
