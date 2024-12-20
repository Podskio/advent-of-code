import { Coords, CoordsSet, CoordsType, Grid } from "../helpers/grid.ts";
import {
  Direction,
  DirectionType,
  cardDirections,
} from "../helpers/directions.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const grid = Grid.fromString(input);

const coordDirString = (coords: CoordsType, direction: DirectionType) =>
  Coords.toString(coords) + ";" + direction.join(",");

const traverse = (visited: CoordsSet) => {
  let guardCoords = grid.coordsOf("^");
  let direction = cardDirections[0];
  const visitedDirections = new Set<string>();

  while (true) {
    const next = Coords.add(guardCoords, direction);
    if (!grid.inBounds(next)) return false;

    const nextChar = grid.at(next);

    if (nextChar == "#") {
      direction = Direction.right(direction);
      const str = coordDirString(guardCoords, direction);

      if (visitedDirections.has(str)) return true;
    } else {
      guardCoords = Coords.add(guardCoords, direction);
      const str = coordDirString(guardCoords, direction);

      if (visitedDirections.has(str)) return true;

      visited.add(guardCoords);
      visitedDirections.add(str);
    }
  }
};

const visited = new CoordsSet();
traverse(visited);

const obstructions = new CoordsSet();

for (const coords of visited) {
  if ("#^".includes(grid.at(coords))) continue;

  grid.set(coords, "#");

  const isCycle = traverse(new CoordsSet());
  if (isCycle) obstructions.add(coords);

  grid.set(coords, ".");
}

console.log("Part 1: " + visited.size);
console.log("Part 2: " + obstructions.size);
