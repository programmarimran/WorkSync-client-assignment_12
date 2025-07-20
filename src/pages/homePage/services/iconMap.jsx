import {
  FaUserPlus,
  FaWallet,
  FaTasks, 
  FaCalendarMinus,
  FaCommentDots,
  FaStarHalfAlt,
  FaClock,
  FaChartBar,
  FaFileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

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
  export default iconMap
