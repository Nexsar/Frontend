import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Menubar } from "./Menubar";
import { useSelector, useDispatch } from "react-redux";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log({ user }, user.type);
    if (!user) {
      navigate("/");
    } else if (user.type != "distributor") {
      navigate("/home");
    }
    async function init() {
      try {
        const client = new LitJsSdk.LitNodeClient({
          litNetwork: LitNetwork.DatilDev,
          debug: false,
        });

        await client.connect();
      } catch (err) {
        console.log("error:", err);
      }
    }

    init();
  }, []);

  return (
    <div>
      <Menubar />
    </div>
  );
};

export default DistributorDashboard;
