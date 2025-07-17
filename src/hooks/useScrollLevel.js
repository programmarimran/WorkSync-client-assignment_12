import { useState, useEffect } from "react";

const useScrollLevel = (levels = []) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      let newLevel = 0;

      levels.forEach((threshold, index) => {
        if (scrollTop >= threshold) {
          newLevel = index + 1;
        }
      });

      setLevel(newLevel);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [levels]);

  return level;
};

export default useScrollLevel;
