import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import ServicesSection from "../services/ServicesSection";
// import TestimonialsSection from "../testimonials/TestimonialsSection";
import TeamSection from "../teamSection/TeamSection";
import CustomerReviewsSection from "../customerReviewSection/CustomerReviewsSection";

const SubHome = () => {
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

  const { services, testimonials ,teamMembers} = data || {};

  return (
    <div>
      <section>
        <ServicesSection services={services} />
      </section>
 
      <section>
        <CustomerReviewsSection testimonials={testimonials}/>
      </section>
      <section>
        <TeamSection teamMembers={teamMembers}/>
      </section>
    </div>
  );
};

export default SubHome;
