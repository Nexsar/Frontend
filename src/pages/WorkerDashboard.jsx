import { getWorkerData } from "../lib/helper";
import React from "react";
import { ScrollView } from "./ScrollView";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkerFeed from "./WorkerFeed";
import WorkerDetails from "./WorkerDetails";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.type != "worker") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="flex gap-3">
      <div className="w-[75vw]">
        <WorkerFeed />
      </div>
      <div className="right-0 w-[15vw] h-screen sticky">
        <WorkerDetails />
      </div>
    </div>
  );
};

export default WorkerDashboard;
