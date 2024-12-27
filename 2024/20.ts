import { Coords, Grid } from "../helpers/grid.ts";

import { Counter } from "../helpers/counter.ts";
import { Graph } from "../helpers/graph.ts";
import { Queue } from "../helpers/queue.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const grid = Grid.fromString(input);
const graph = Graph.fromGrid(grid, ["#"]);

let part1 = 0;
let part2 = 0;

const start = Coords.toString(grid.coordsOf("S"));
const queue = new Queue<string>([start]);
const distances = [start];

while (!queue.empty()) {
  const node = queue.pop()!;
  const neighbors = graph.neighbors(node);

  for (const neighbor of neighbors.keys()) {
    if (distances.includes(neighbor)) continue;
    distances.push(neighbor);
    queue.push(neighbor);
  }
}

const savedTime2 = new Counter<number>();
const savedTime20 = new Counter<number>();

for (let dist = 0; dist < distances.length; dist++) {
  const node = distances[dist];
  const coords = Coords.fromString(node);

  for (let i = dist; i < distances.length; i++) {
    const cheat = Coords.fromString(distances[i]);
    const manhatDist = Coords.manhattanDistance(coords, cheat);
    if (manhatDist == 2) savedTime2.increment(i - dist - 2);
    if (manhatDist >= 2 && manhatDist <= 20)
      savedTime20.increment(i - dist - manhatDist);
  }
}

for (const [ps, count] of savedTime2) if (ps >= 100) part1 += count;
for (const [ps, count] of savedTime20) if (ps >= 100) part2 += count;

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
