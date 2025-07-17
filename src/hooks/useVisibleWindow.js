import React, { useEffect, useState } from "react";

const useVisibleWindow = () => {
  const [visible, setVisible] = useState(false);

  // Scroll position track করা
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return visible;
};

export default useVisibleWindow;