import { Button } from "../components/ui/Button";
import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { CardSpotlight } from "../components/ui/card-spotlight";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const InteractiveHome = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  console.log({ user });

  useEffect(() => {
    if (!user.is_lit_authenticated) {
      navigate("/lit");
    }
  }, []);

  const handleDistributor = () => {
    //TODO: open a pop up-> take his details -> create a distributor first and then route
    navigate("/distributor");
  };

  const handleWorker = () => {
    //TODO: create a worker first
    navigate("/worker");
  };

  return (
    <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="z-20 flex my-3 mx-2 gap-2">
        <CardSpotlight className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-white">What do you want to register as? </h1>
          <div className="flex gap-3">
            <Button
              onClick={handleDistributor}
              className="h-[50px] w-[100px] bg-violet-700 z-50 cursor-pointer"
            >
              Distributor
            </Button>
            <Button
              onClick={handleWorker}
              className="h-[50px] w-[100px] bg-green-400 z-50 cursor-pointer"
            >
              Worker
            </Button>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
};

export default InteractiveHome;
