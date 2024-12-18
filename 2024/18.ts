import { Coords, Grid } from "../helpers/grid.ts";

import { Graph } from "../helpers/graph.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = "";

const size = 70;
const start = Coords.toString([0, 0]);
const end = Coords.toString([size, size]);

const getPathForBytes = (bytes: number) => {
  const grid = Grid.fromValue(size + 1, size + 1, ".");

  for (const line of lines.slice(0, bytes)) {
    const [x, y] = line.split(",").map(Number);
    grid.set([x, y], "#");
  }

  return Graph.fromGrid(grid, ["#"]).dijkstra(start, [end]);
};

let low = 0;
let high = lines.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  const path = getPathForBytes(mid);

  if (path) low = mid + 1;
  else high = mid - 1;
}

const path = getPathForBytes(1024);
part1 = path ? path.length - 1 : 0;
part2 = lines[high];

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
