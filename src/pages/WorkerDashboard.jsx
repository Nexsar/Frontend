import React from "react";
import { ScrollView } from "./ScrollView";

const WorkerDashboard: React.FC = () => {
  return (
    <div className="flex gap-3">
      <div className="left-0 w-[15vw] h-screen sticky">left panel</div>
      <div className="w-[60vw]">
        <ScrollView />
      </div>
      <div className="right-0 w-[15vw] h-screen sticky">right panel</div>
    </div>
  );
};

export default WorkerDashboard;
