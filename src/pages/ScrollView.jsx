import { Button } from "../components/ui/button";
import * as React from "react";

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function ScrollView() {
  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              <div className="w-30 h-[45vh] border-2 bg-blue-300">
                some data
                <div className="flex gap-2">
                  <div className="w-20 w-30">option 2</div>
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
