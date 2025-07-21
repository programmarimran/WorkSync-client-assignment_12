import Marquee from "react-fast-marquee";
import { FaUserCircle } from "react-icons/fa";

const TeamSection = ({ teamMembers }) => {
  return (
    <section className="py-12 overflow-hidden">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Meet Our <span className="text-primary">Team</span>
        </h2>

        <div className="relative">
          {/* Left to Right */}
          <Marquee
            direction="left"
            speed={80}
            // pauseOnHover={true}
            gradient={false}
            className="mb-6"
          >
            <div className="flex items-center gap-x-30 ml-24">
              {teamMembers.map((member, index) => (
                <div
                  key={`ltr-${index}`}
                  className=" w-48 h-full flex flex-col justify-between flex-shrink-0 backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-5 text-center transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={member.photo||<FaUserCircle />}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary shadow-md"
                  />
                  <h3 className="mt-4 font-semibold text-lg text-base-content dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </Marquee>

          {/* Right to Left */}
          <Marquee
            direction="right"
            speed={80}
            // pauseOnHover={true}
            gradient={false}
          >
            <div className="flex items-center gap-x-30 ml-24">
              {teamMembers.map((member, index) => (
                <div
                  key={`rtl-${index}`}
                  className=" w-48 h-full flex flex-col justify-between flex-shrink-0 backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-5 text-center transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary shadow-md"
                  />
                  <h3 className="mt-4 font-semibold text-lg text-base-content dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;


