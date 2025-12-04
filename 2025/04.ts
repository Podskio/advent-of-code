import { CoordsSet, Grid } from "../helpers/grid.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const grid = Grid.fromString(input);

let part1 = 0;
let part2 = 0;

const getAccessiblePaper = (grid: Grid<string>) => {
  const accessible = new CoordsSet();

  for (const [x, y, char] of grid) {
    if (char !== "@") continue;

    const neighbors = grid.allNeighbors([x, y]);
    const paperNeighbors = neighbors.filter(([, , n]) => n == "@");

    if (paperNeighbors.length < 4) accessible.add([x, y]);
  }

  return accessible;
};

part1 = getAccessiblePaper(grid).size;

let removed = 0;

do {
  const accessible = getAccessiblePaper(grid);

  removed = accessible.size;
  part2 += accessible.size;

  accessible.forEach(([x, y]) => grid.set([x, y], "."));
} while (removed !== 0);

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
