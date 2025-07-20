import { useQuery } from "@tanstack/react-query";
import Banner from "../banner/Banner";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import ServicesSection from "../services/ServicesSection";

const Home = () => {
  const axiosInstance = useAxiosInstance();
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/home");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center mt-10">Loading homepage...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load homepage data
      </div>
    );

  const { services } = data || {};

  return (
    <>
      <Banner></Banner>
      <ServicesSection services={services} />
    </>
  );
};

export default Home;
