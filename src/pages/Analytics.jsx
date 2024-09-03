import { Bar, BarChart } from "recharts";

import { ChartContainer } from "../components/ui/chart";

const chartData = [
  { votes: 186 },
  { votes: 305 },
  { votes: 237 },
  { votes: 73 },
  { votes: 130 },
  { votes: 140 },
];

const chartConfig = {
  votes: {
    label: "Total Votes",
    color: "#2563eb",
  },
};

export function Analytics() {
  /*
 TODO : get current distributor from redux
  */

  return (
    <ChartContainer config={chartConfig} className="min-h-[20px] w-[70vw]">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="votes" fill="blue" radius={2} />
      </BarChart>
    </ChartContainer>
  );
}
