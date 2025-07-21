
import { useNavigate, useLocation } from "react-router";

const useScrollToSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });


      const interval = setInterval(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 100);

      setTimeout(() => clearInterval(interval), 3000);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { scrollToSection };
};

export default useScrollToSection;
