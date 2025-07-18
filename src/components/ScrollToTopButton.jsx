
import { GoMoveToTop } from "react-icons/go";
import useVisibleWindow from "../hooks/useVisibleWindow";

const ScrollToTopButton = () => {
 const visible=useVisibleWindow()

  // Scroll to top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-primary/100 text-white rounded-full shadow-lg hover:bg-primary/95 hover:shadow-2xl transition"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
     <GoMoveToTop size={20} />
    </button>
  );
};

export default ScrollToTopButton;