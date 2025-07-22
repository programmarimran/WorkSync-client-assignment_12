import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CustomerReviewCard from "./CustomerReviewCard";
import { useState } from "react";

const CustomerReviewsSection = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      perView: 3,
      spacing: 20,
      origin: "center", // important for center alignment
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
          origin: "center",
        },
      },
    },
  });

  return (
    <section className="py-12 text-base-content dark:text-neutral-content">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        What People Are <span className=" text-primary">Saying</span>
      </h2>

      <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto px-4">
        {testimonials.map((review, idx) => {
          const isCenter = idx === currentSlide;

          return (
            <div key={idx} className="keen-slider__slide flex justify-center">
              <div
                className={`transition-all duration-500 w-full max-w-sm md:max-w-xs rounded-xl ${
                  isCenter
                    ? "scale-85 md:scale-100 opacity-100 blur-0"
                    : "scale-90 opacity-40"
                }`}
              >
                <CustomerReviewCard reviewData={review} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
