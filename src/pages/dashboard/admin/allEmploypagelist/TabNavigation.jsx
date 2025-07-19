import { useState } from "react";

const TabNavigation = ({ setTabLevel }) => {
  const [activeTab, setActiveTab] = useState("first");
  // console.log(activeTab)

  const tabs = [
    { id: "first", label: "All Verified Employees", level: 1 },
    { id: "second", label: "All HR", level: 2 },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setTabLevel(tab.level);
  };

  return (
    <div className="flex pl-4 border-b border-2-b border-primary">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? "text-primary border border-primary rounded-t-lg bg-primary/20"
              : "text-primary/70"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
