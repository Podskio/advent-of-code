import { Coords, CoordsType, Grid } from "../helpers/grid.ts";
import { Direction, DirectionType } from "../helpers/directions.ts";

import { Queue } from "../helpers/queue.ts";
import { cartesian } from "../helpers/array.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const codes = input.split("\n");

let part1 = 0;
let part2 = 0;

const numPad = new Grid([
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
]);

const dirPad = new Grid([
  [null, "^", "A"],
  ["<", "v", ">"],
]);

const generateSeqs = (pad: Grid<string | null>) => {
  const sequences: Record<string, string[]> = {};

  for (const [ax, ay, a] of pad) {
    if (a == null) continue;
    for (const [, , b] of pad) {
      if (b == null) continue;

      if (a == b) {
        sequences[a + b] = ["A"];
        continue;
      }

      const possibilities = [];
      const queue = new Queue<[CoordsType, string]>([[[ax, ay], ""]]);
      let optimal = Infinity;

      qloop: while (!queue.empty()) {
        const [coords, seq] = queue.pop()!;

        for (const [nx, ny, n] of pad.neighbors(coords)) {
          if (n == null) continue;
          if (optimal < seq.length + 1) break qloop;

          const dir = Coords.subtract([nx, ny], coords);
          const arr = Direction.toArrow(dir as DirectionType);
          if (n == b) {
            optimal = seq.length + 1;
            possibilities.push(seq + arr + "A");
          } else queue.push([[nx, ny], seq + arr]);
        }
      }

      sequences[a + b] = possibilities;
    }
  }

  return sequences;
};

const solveMovement = (code: string, seqs: Record<string, string[]>) => {
  let state = "A";
  const charSeqs = [];

  for (const char of code) {
    charSeqs.push(seqs[state + char]);
    state = char;
  }

  return cartesian(charSeqs).map((s) => s.join(""));
};

const numSeqs = generateSeqs(numPad);
const dirSeqs = generateSeqs(dirPad);

const dirLens: Record<string, number> = {};
for (const seq in dirSeqs) dirLens[seq] = dirSeqs[seq][0].length;

const lengthCache = new Map<string, number>();
const computeLength = (a: string, b: string, depth: number) => {
  if (lengthCache.has(a + b + depth)) return lengthCache.get(a + b + depth)!;
  if (depth == 1) return dirLens[a + b];
  let optimal = Infinity;

  for (let seq of dirSeqs[a + b]) {
    let len = 0;
    seq = "A" + seq;
    for (let i = 0; i < seq.length - 1; i++)
      len += computeLength(seq[i], seq[i + 1], depth - 1);
    optimal = Math.min(optimal, len);
  }

  lengthCache.set(a + b + depth, optimal);
  return optimal;
};

for (const code of codes) {
  const numMoves = solveMovement(code, numSeqs);
  let best2 = Infinity;
  let best25 = Infinity;

  for (let seq of numMoves) {
    seq = "A" + seq;
    let len2 = 0;
    let len25 = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      len2 += computeLength(seq[i], seq[i + 1], 2);
      len25 += computeLength(seq[i], seq[i + 1], 25);
    }
    best2 = Math.min(best2, len2);
    best25 = Math.min(best25, len25);
  }

  part1 += best2 * parseInt(code.slice(0, -1));
  part2 += best25 * parseInt(code.slice(0, -1));
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
