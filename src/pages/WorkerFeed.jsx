import { Button } from "../components/ui/Button.jsx";
import * as React from "react";

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useEffect } from "react";
import { useState } from "react";
import {
  initWorker,
  removeWorker,
  updateRewards,
  updateVotingMapping,
  withdrawRewards,
  getWorker,
  getRewards,
  getVotedOption,
  getAllWorkersRewards,
} from "../lib/worker.js";

import * as Distributor from "../lib/distributor.js";
import AnimatedOption from "./AnimatedOption.jsx";
import OptionGrid from "./OptionGrid.jsx";

//fetch from postgres

const WorkerFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "which is the best wallet?",
      options: [
        {
          id: 1,
          image_url: "/metamask.png",
          votes: 12,
        },
        {
          id: 2,
          image_url: "/phantom.png",
          votes: 34,
        },
        {
          id: 3,
          image_url: "/safe.jpg",
          votes: 90,
        },
      ],
    },
    {
      id: 2,
      content: "which is the best wallet?",
      options: [
        {
          id: 4,
          image_url: "/metamask.png",
          votes: 12,
        },
        {
          id: 5,
          image_url: "/phantom.png",
          votes: 34,
        },
        {
          id: 6,
          image_url: "/safe.jpg",
          votes: 90,
        },
      ],
    },
    {
      id: 3,
      content: "which is the best wallet?",
      options: [
        {
          id: 7,
          image_url: "/metamask.png",
          votes: 12,
        },
        {
          id: 8,
          image_url: "/phantom.png",
          votes: 34,
        },
        {
          id: 9,
          image_url: "/safe.jpg",
          votes: 90,
        },
      ],
    },
  ]);
  const be_url = "http://localhost:8000/data/all_posts";

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = (post_id) => {
    if (post_id != selectedPost) return;

    console.log(
      `voting for option id ${selectedOption} for the post id ${selectedPost}`,
    );
  };

  ////// We need List of all the Distributor Addresses.... (So that we can fetch all the Post corresponding to all the distributors)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(be_url);
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        console.log("could not fetch posts...");
      }
    };

    getPosts();
  }, [posts]);

  const handleVotes = async (postId) => {
    return await Distributor.getTotalVotesOnPost(postId);
  };

  const handleOptions = async (postId) => {
    return await Distributor.getAllOptions(postId);
  };

  const handleSelected = (post_id, option_id) => {
    setSelectedPost(post_id);
    setSelectedOption(option_id);
  };

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
        {posts &&
          posts.map((post) => (
            <>
              <div key={post.id} className="text-sm">
                <div className="w-[75vw] h-[45vh] border-2 bg-blue-300">
                  <div className="flex h-full w-full gap-2 justify-center items-center">
                    {post.options.map((option) => {
                      return (
                        <div
                          key={option.id}
                          className="shadow-md w-[20vw] h-[20vh]"
                          onClick={() => handleSelected(post.id, option.id)}
                        >
                          <OptionGrid option={option} />
                          <AnimatedOption
                            post_title={post.content}
                            image_url={option.image_url}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <Button
                    variant="destructive"
                    onClick={() => handleVote(post.id)}
                  >
                    Vote
                  </Button>
                </div>
              </div>

              <Separator className="my-2" />
            </>
          ))}
      </div>
    </ScrollArea>
  );
};

export default WorkerFeed;
