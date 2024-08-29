import { getWorkerData } from "../lib/helper";
import React from "react";
import { ScrollView } from "./ScrollView";
import { useState } from "react";

const WorkerDashboard = () => {
  const [workerdata, setworkerdata] = useState({});
  return (
    <div className="flex gap-3">
      <div className="left-0 w-[15vw] h-screen sticky">left panel</div>
      <div className="w-[60vw]">
        <ScrollView />
      </div>
      <div className="right-0 w-[15vw] h-screen sticky">
        <button onClick={() => setworkerdata(getWorkerData())}>
          get my data
        </button>
        {<p>{workerdata.name ?? "no name"}</p>}
      </div>
    </div>
  );
};

export default WorkerDashboard;
