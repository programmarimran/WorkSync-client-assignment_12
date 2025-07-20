// import React from "react";
// import Marquee from "react-fast-marquee";

// const TestimonialsSection = ({ testimonials = [] }) => {
//   return (
//     <section className="py-10 ">
//       <div className=" px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
//           What People Are Saying
//         </h2>
//         <Marquee
//           gradient={false}
//           speed={50}
//           pauseOnHover={true}
//           className="space-x-6"
//         >
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] max-w-sm bg-white dark:bg-base-300  hover:bg-primary/40 shadow-md p-6 rounded-xl mx-4"
//             >
//               <p className="text-gray-950 dark:text-gray-200 italic">
//                 "{testimonial.message}"
//               </p>
//               <div className=" flex items-center justify-start gap-3">
//                 <img
//                   className=" w-10 h-10  rounded-full  border-2 border-primary"
//                   src={testimonial.photo}
//                   alt="photo"
//                 />
//                 <div className="mt-4">
//                   <h4 className="text-lg font-semibold text-primary">
//                     {testimonial.name}
//                   </h4>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {testimonial.designation || "Client"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Marquee>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;
