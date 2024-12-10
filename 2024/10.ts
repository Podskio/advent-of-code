const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");
const grid = lines.map((l) => l.split("").map(Number));

type Coords = [number, number];

const trailheads: Coords[] = [];
const endpoints: Coords[] = [];

let scores = 0;
let ratings = 0;

const isInGrid = (coords: Coords) =>
  coords[0] >= 0 &&
  coords[0] < grid[0].length &&
  coords[1] >= 0 &&
  coords[1] < grid.length;

const gridAt = (coords: Coords) => grid[coords[1]][coords[0]];

const getAccessible = (coords: Coords) => {
  const neighbors: Coords[] = [
    [coords[0] - 1, coords[1]],
    [coords[0] + 1, coords[1]],
    [coords[0], coords[1] - 1],
    [coords[0], coords[1] + 1],
  ];

  return neighbors.filter(
    (c) => isInGrid(c) && gridAt(c) === gridAt(coords) + 1
  );
};

const findPathsToEnd = (
  start: Coords,
  distinct: boolean,
  visited?: Set<string>
): number => {
  if (gridAt(start) === 9) {
    if (distinct) return 1;
    if (visited!.has(start.toString())) return 0;

    visited!.add(start.toString());
    return 1;
  }

  const neighbors = getAccessible(start);

  return neighbors.reduce(
    (a, c) => a + findPathsToEnd(c, distinct, visited),
    0
  );
};

// Find trailheads and endpoints
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === 0) trailheads.push([x, y]);
    if (grid[y][x] === 9) endpoints.push([x, y]);
  }
}

for (const trailhead of trailheads) {
  const visited = new Set<string>();
  const paths = findPathsToEnd(trailhead, false, visited);
  const distinctPaths = findPathsToEnd(trailhead, true);

  scores += paths;
  ratings += distinctPaths;
}

console.log("Part 1: " + scores);
console.log("Part 2: " + ratings);
