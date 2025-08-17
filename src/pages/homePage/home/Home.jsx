import useScrollToSection from "../../../hooks/useScrollToSection.js";
import Banner from "../banner/Banner";
import SubHome from "./SubHome";

const Home = () => {
  const { sectionRef, scrollToSection } = useScrollToSection();
  return (
    <>
      <section>
        <Banner scrollToSection={scrollToSection}></Banner>
      </section>
      {/* sub section with API */}
   
        <SubHome sectionRef={sectionRef} />
 
    </>
  );
};

export default Home;
