import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menubar } from "./Menubar";
import { useSelector, useDispatch } from "react-redux";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from "@lit-protocol/constants";
import { GeneralDashboard } from "./GeneralDashboard";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  if(!user){
    navigate("/");
  }

  useEffect(() => {
    console.log("getting all posts from the backend to send to blockchain..!");
    async function sync() {
      try {
        const address = JSON.parse(localStorage.getItem('pkp')).ethAddress;
        console.log("address",address);

        const posts_endpoint = `http://192.168.45.90:8000/posts/distributor/${address}`
        const posts_for_this_distributor = await fetch(posts_endpoint,{
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log("posts for this distributor", posts_for_this_distributor);
        setPosts(posts_for_this_distributor);
        //send this to the contract:
      } catch (err) {
        console.log("error:", err);
      }
    }

    sync();
  }, []);

  return (
    <div className="flex mt-4 h-[50vh]">
      <GeneralDashboard posts_list={posts} />
    </div>
  );
};

export default DistributorDashboard;
