import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import ServicesSection from "../services/ServicesSection";
// import TestimonialsSection from "../testimonials/TestimonialsSection";
import TeamSection from "../teamSection/TeamSection";
import CustomerReviewsSection from "../customerReviewSection/CustomerReviewsSection";
import FaqSection from "../faqSection/FaqSection";
import BeLocation from "../beLocation/BeLocation";

import HiringSection from "../hiringSection/HiringSection";

const SubHome = ({ sectionRef }) => {
  const axiosInstance = useAxiosInstance();
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/home");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className=" flex justify-center items-center mt-10">
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load homepage data
      </div>
    );

  const { services, testimonials, teamMembers, faqs } = data || {};
  const teamMembersDouble=[...teamMembers,...teamMembers,...teamMembers,...teamMembers]

  return (
    <div>
      <section className="mt-12 mt:my-20 " id="services" ref={sectionRef}>
        <ServicesSection services={services} />
      </section>
      <section>
        <HiringSection/>
      </section>
    
      <section className="mt-12 mt:my-20 ">
        <TeamSection teamMembers={teamMembersDouble} />
      </section>
      <section className="mt-12 mt:my-20 " id="review">
        <CustomerReviewsSection testimonials={testimonials} />
      </section>

      <section className="mt-12 mt:my-20 ">
        <BeLocation />
      </section>

      <section className="mt-12 mt:my-20 " id="faq">
        <FaqSection faqs={faqs} />
      </section>
    </div>
  );
};

export default SubHome;
