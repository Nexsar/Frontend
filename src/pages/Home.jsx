import React from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleDistributor = () => {
    navigate("/distributor");
  };
  return (
    <div>
      <div>
        <p>What do you want to register as?</p>

        <Button variant="destructive" onClick={handleDistributor}>
          Distributor
        </Button>
        <Button>Worker</Button>
      </div>
    </div>
  );
};

export default Home;
