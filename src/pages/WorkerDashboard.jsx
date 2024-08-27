import React from "react";
import { ScrollView } from "./ScrollView";

const WorkerDashboard = () => {
  return (
    <div className="flex gap-3">
      <div className="left-0 w-[15vw] h-screen overflow-none">left panel</div>
      <div className="w-[60vw]">
        <ScrollView />
      </div>
      <div className="right-0 w-[15vw] h-screen sticky">right panel</div>
    </div>
  );
};

export default WorkerDashboard;
