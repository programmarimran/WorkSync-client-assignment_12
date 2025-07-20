import Banner from "../banner/Banner";
import SubHome from "./SubHome";

const Home = () => {
  return (
    <>
      <section>
        <Banner></Banner>
      </section>
      {/* sub section with API */}
      <SubHome />
    </>
  );
};

export default Home;
