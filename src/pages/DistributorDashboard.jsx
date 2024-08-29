import React, { useEffect } from "react";
import { Menubar } from "./Menubar";

import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";

const DistributorDashboard = () => {
  useEffect(() => {
    async function init() {
      const client = new LitJsSdk.LitNodeClient({
        litNetwork: LitNetwork.Datil,
      });

      const res = await client.connect();
      console.log(res);
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
