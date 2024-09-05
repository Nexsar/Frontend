import React from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleDistributor = () => {
    //TODO: open a pop up-> take his details -> create a distributor first and then route
    navigate("/distributor");
  };

  const handleWorker = () => {
    //TODO: create a worker first
    navigate("/worker");
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <p>What do you want to register as?</p>
        <div className="flex my-3 mx-2 gap-2">
          <Button variant="destructive" onClick={handleDistributor}>
            Distributor
          </Button>
          <Button onClick={handleWorker}>Worker</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
