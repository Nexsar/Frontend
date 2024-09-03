import React from "react";
import { GeminiEffect } from "./GeminiEffect";
import { Navbar } from "./Navbar";

const LandingPage = () => {
  return (
    <>
      {/* TODO: hardcoded postion, fix later */}
      <div className="fixed top-[85vh] left-[39.5vw] z-50 h-[15vh]">
        <Navbar />
      </div>
      <div>
        <GeminiEffect />
      </div>
    </>
  );
};

export default LandingPage;
