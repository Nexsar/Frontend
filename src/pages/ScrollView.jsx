import { Button } from "../components/ui/Button.jsx";
import * as React from "react";

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useEffect } from "react";
import { useState } from "react";

//fetch fron postgres

export function ScrollView() {
  const [posts, setPosts] = useState([]);
  const be_url = "http://localhost:8000/data/all_posts";

  useEffect(() => {
    const f = async () => {
      let data = await fetch(be_url, {
        method: "GET",
      });
      data = await data.json();
      console.log("data", data);
      setPosts(data.posts);
    };

    f();
  }, [posts]);
  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
        {posts &&
          posts.map((post) => (
            <>
              <div key={post.id} className="text-sm">
                <div className="w-30 h-[45vh] border-2 bg-blue-300">
                  {post.content}
                  <div className="flex gap-2">
                    <img
                      src={post.options[0].image_url}
                      alt="noimg"
                      className="w-20 w-30"
                    />
                    <div className="w-20 w-30">option 1</div>
                    <div className="w-20 w-30">option 3</div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <Button variant="destructive">Vote</Button>
                  <p>Total Votes: 450</p>
                </div>
              </div>
              <Separator className="my-2" />
            </>
          ))}
      </div>
    </ScrollArea>
  );
}
