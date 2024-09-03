import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export function PostTab({ post }) {
  console.log(post);
  let max_voted = -1;
  let max_votes = -1;
  for (let i = 0; i < post.options.length; i++) {
    if (post.options[i].votes > max_votes) {
      max_votes = post.options[i].votes;
      max_voted = i;
    }
  }
  return (
    <Tabs defaultValue="post" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="winner">Winner</TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>Post</CardTitle>
            <CardDescription>{post.content}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {post.options.map((option) => (
              <div className="h-[32px] w-[32px] flex gap-2">
                <img src={option.image_url} />
                <p>{option.votes}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>Delete Post</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="winner">
        <Card>
          <CardHeader>
            <CardTitle>Winner</CardTitle>
            <CardDescription>Status of the post is...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {post.done ? (
              <div className="h-[112px] flex">
                <div className="">
                  <img
                    className="h-[80px]"
                    src={post.options[max_voted].image_url}
                  />
                </div>
              </div>
            ) : (
              <div className="h-[112px]">
                <p>Not yet completed</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button>End Voting</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
