// hooks/useScrollToSection.js
import { useRef } from "react";

const useScrollToSection = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { sectionRef, scrollToSection };
};

export default useScrollToSection;
