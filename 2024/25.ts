import { Grid } from "../helpers/grid.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const schematics = input.split("\n\n");

let part1 = 0;

const locks = [];
const keys = [];

const lockHeight = 5;

const countElem = (arr: string[], elem: string) =>
  arr.filter((c) => c === elem).length;

for (const schematic of schematics) {
  const grid = Grid.fromString(schematic);
  const pins = [];

  for (let c = 0; c < grid.cols; c++) {
    const col = grid.col(c);
    pins.push(countElem(col, "#") - 1);
  }

  if (grid.row(0).every((c) => c === "#")) locks.push(pins);
  else keys.push(pins);
}

for (const lock of locks) {
  for (const key of keys) {
    let fit = true;
    for (let i = 0; i < lock.length; i++)
      if (lock[i] + key[i] > lockHeight) fit = false;
    if (fit) part1++;
  }
}

console.log("Part 1: " + part1);
