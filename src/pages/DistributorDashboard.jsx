import React, { useEffect } from "react";
import { Menubar } from "./Menubar";

import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";

const DistributorDashboard = () => {
  useEffect(() => {
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
