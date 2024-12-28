import {
  Direction,
  DirectionChar,
  DirectionType,
} from "../helpers/directions.ts";
import { Coords, Grid } from "../helpers/grid.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const [map, instructions] = input.split("\n\n");
const grid = Grid.fromString(map);
const moves = instructions.split("\n").join("");

const grid2 = Grid.fromString(
  grid
    .toString()
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
);

let part1 = 0;
let part2 = 0;

let robot = grid.coordsOf("@");
let robot2 = grid2.coordsOf("@");

grid.set(robot, ".");
grid2.set(robot2, ".");

const pushBoxes = (dir: DirectionType) => {
  const next = Coords.add(robot, dir);
  const nextChar = grid.at(next);

  if (nextChar === "#") return;
  else if (nextChar === ".") robot = next;
  else if (nextChar === "O") {
    const boxes = [];
    let curr = next;

    while (true) {
      const char = grid.at(curr);

      if (char == "#") return;
      else if (char == ".") break;
      else if (char == "O") boxes.push(curr);

      curr = Coords.add(curr, dir);
    }

    for (const box of boxes) grid.set(Coords.add(box, dir), "O");

    grid.set(next, ".");
    robot = next;
  }
};

const pushBoxes2 = (dir: DirectionType) => {
  const next = Coords.add(robot2, dir);
  const nextChar = grid2.at(next);

  if (nextChar === "#") return;
  else if (nextChar === ".") {
    robot2 = next;
    return;
  }

  const boxes = [robot2];

  for (const box of boxes) {
    const nextBox = Coords.add(box, dir);
    const char = grid2.at(nextBox);

    if (boxes.find((v) => Coords.equals(v, nextBox))) continue;

    if (char == "#") return;
    else if (char == "[") {
      boxes.push(nextBox);
      boxes.push(Coords.add(nextBox, [1, 0]));
    } else if (char == "]") {
      boxes.push(nextBox);
      boxes.push(Coords.add(nextBox, [-1, 0]));
    }
  }

  const clone = grid2.clone();

  for (const box of boxes.slice(1)) grid2.set(box, ".");
  for (const box of boxes.slice(1))
    grid2.set(Coords.add(box, dir), clone.at(box));

  grid2.set(next, ".");
  robot2 = next;
};

for (const move of moves) {
  const dir = Direction.fromChar(move as DirectionChar);
  pushBoxes(dir);
  pushBoxes2(dir);
}

part1 = grid
  .findAllCoords((v) => v == "O")
  .reduce((acc, [x, y]) => acc + 100 * y + x, 0);

part2 = grid2
  .findAllCoords((v) => v == "[")
  .reduce((acc, [x, y]) => acc + 100 * y + x, 0);

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
