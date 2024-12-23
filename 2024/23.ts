import { Graph } from "../helpers/graph.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = "";

const graph = new Graph<string>();
graph.addEdges(lines.map((l) => l.split("-")) as [string, string][], false);

const bronKerbosch = (
  R: Set<string>,
  P: Set<string>,
  X: Set<string>,
  cliques: string[][] = [],
  triangles: string[][] = []
) => {
  if (R.size === 3) triangles.push(Array.from(R));

  if (P.size === 0 && X.size === 0) {
    cliques.push(Array.from(R));
    return [cliques, triangles];
  }

  for (const v of P) {
    const N = new Set(graph.neighbors(v).keys());

    bronKerbosch(
      R.union(new Set([v])),
      P.intersection(N),
      X.intersection(N),
      cliques,
      triangles
    );

    P.delete(v);
    X.add(v);
  }

  return [cliques, triangles];
};

const [cliques, triangles] = bronKerbosch(
  new Set(),
  new Set(graph.nodes),
  new Set()
);

part1 = triangles.filter((t) => t.some((v) => v.startsWith("t"))).length;

const largestClique = cliques.sort((a, b) => b.length - a.length)[0];
part2 = largestClique.sort().join(",");

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
