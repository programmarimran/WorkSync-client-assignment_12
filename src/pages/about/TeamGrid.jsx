import React from "react";

const team = [
  { name: "Md Imran Hasan", role: "Lead Developer", img: "https://i.ibb.co/m50sFhYh/Whats-App-Image-2025-06-24-at-23-34-28-3f6e0c5e.jpg" },
  { name: "Md Parves Alom", role: "UI/UX Designer", img: "https://i.ibb.co/S0TcbCG/parves.jpg" },
  { name: "IMRAN", role: "Backend Engineer", img: "https://i.ibb.co/gbMHgXXt/Whats-App-Image-2025-06-28-at-12-58-14-6a6860f6.jpg" },
];

const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {team.map((member, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 shadow rounded p-4 text-center transition"
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;
