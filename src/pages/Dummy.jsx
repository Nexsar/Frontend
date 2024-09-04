import React, { useEffect } from "react";
import { ethers } from "ethers";

const Dummy = () => {
  useEffect(() => {
    const getsigner = async () => {
      console.log("window ka ethereum", window.ethereum);
      try {
        console.log("here...");
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
      } catch (err) {
        console.log("error happened in getting signer", err);
      }

      // return new ethers.Contract(contractAddress, contractABI, signer)
    };

    getsigner();
  }, []);
};

export default Dummy;
