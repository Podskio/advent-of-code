import { Coords, Grid } from "../helpers/grid.ts";
import { PriorityQueue, Queue } from "../helpers/queue.ts";

import { Graph } from "../helpers/graph.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const grid = Grid.fromString(input);
const graph = Graph.fromGrid(grid, ["#"]);

let part1 = 0;
let part2 = 0;

const start = grid.coordsOf("S");
const end = grid.coordsOf("E");

const queue = new PriorityQueue<string>([[[...start, 1, 0].toString(), 0]]);
const costs = new Map<string, number>([[start.toString(), 0]]);
const backtrack = new Map<string, Set<string>>();
const endStates = new Set<string>();

let bestCost = Infinity;

while (!queue.empty()) {
  const [node, weight] = queue.pop()!;
  const [x, y, dx, dy] = node.split(",").map(Number);

  if (weight > costs.get(Coords.toString([x, y]))!) continue;

  if (Coords.equals([x, y], end)) {
    if (weight > bestCost) break;
    bestCost = weight;
    endStates.add(node);
  }

  const neighbors = graph.neighbors(Coords.toString([x, y]));

  for (const neighbor of neighbors.keys()) {
    const dir = Coords.subtract(Coords.fromString(neighbor), [x, y]);
    const backtrackString = neighbor + "," + dir.toString();
    const cost = costs.get(backtrackString) ?? Infinity;
    const newWeight = weight + (Coords.equals(dir, [dx, dy]) ? 1 : 1001);

    if (newWeight > cost) continue;
    if (newWeight < cost) {
      backtrack.set(backtrackString, new Set());
      costs.set(backtrackString, newWeight);
    }

    if (!backtrack.has(backtrackString))
      backtrack.set(backtrackString, new Set());

    backtrack.get(backtrackString)!.add([x, y, dx, dy].toString());
    queue.push([neighbor, Coords.toString(dir)].toString(), newWeight);
  }
}

part1 = bestCost;

const states = new Queue<string>([...endStates]);
const seen = new Set<string>([...endStates]);

while (!states.empty()) {
  const key = states.popBack()!;
  if (!backtrack.has(key)) continue;
  for (const last of backtrack.get(key)!) {
    if (seen.has(last)) continue;
    seen.add(last);
    states.push(last);
  }
}

const positions = new Set<string>();
for (const state of seen) positions.add(state.split(",").slice(0, 2).join(","));

part2 = positions.size;

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
