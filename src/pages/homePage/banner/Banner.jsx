import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[70vh] rounded-xl"
    >
      {[
        {
          img: "https://i.ibb.co/93g0QM7k/worksync-bannar1.jpg",
          title: "Streamline Employee Workflow",
          description: "Manage tasks, monitor performance, and optimize your team's productivity with WorkSync.",
        },
        {
          img: "https://i.ibb.co/nqH2LVd5/worksync-bannar2.jpg",
          title: "Your HR Dashboard, Simplified",
          description: "Easy contract management, salary tracking, and more—all in one place.",
        },
        {
          img: "https://i.ibb.co/TxYSRH4F/worksync-bannar3.jpg",
          title: "Grow Your Business With Confidence",
          description: "WorkSync helps you focus on growth, not paperwork.",
        },
      ].map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl"
            />
            
            <div className="absolute bg-black/55 inset-0  flex flex-col justify-center items-center p-6 md:p-12 space-y-4 rounded-xl">
             <div className=" space-y-5">
               <h2 className="text-2xl md:text-5xl font-bold text-white max-w-xl">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg text-gray-300 max-w-xl">
                {slide.description}
              </p>
              <button className="btn btn-primary mt-2">Get Started</button>
             </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
