const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");
const grid = lines.map((l) => l.split(""));

let part1 = 0;
let part2 = 0;

type Coords = [number, number];

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const isInGrid = (coords: Coords) =>
  coords[0] >= 0 &&
  coords[0] < grid[0].length &&
  coords[1] >= 0 &&
  coords[1] < grid.length;

const getNeighbors = (coords: Coords, plant: string) => {
  const neighbors: Coords[] = directions.map((d) => [
    coords[0] + d[0],
    coords[1] + d[1],
  ]);

  return neighbors.filter((c) => isInGrid(c) && grid[c[1]][c[0]] == plant);
};

const getRegion = (start: Coords, visited: Set<string>, perimeter = 0) => {
  const neighbors = getNeighbors(start, grid[start[1]][start[0]]);
  perimeter += 4 - neighbors.length;

  visited.add(start.toString());

  for (const neighbor of neighbors) {
    if (visited.has(neighbor.toString())) continue;
    const region = getRegion(neighbor, visited, perimeter);
    perimeter = region.perimeter;
  }

  return { plants: visited, perimeter };
};

const getSidesInRegion = (region: Set<string>) => {
  const edgeCorners = new Set<string>();

  for (const plant of region) {
    const [x, y] = plant.split(",").map(Number);

    for (const [dx, dy] of directions) {
      if (region.has([x + dx, y + dy].toString())) continue;

      let nextX = x;
      let nextY = y;

      while (
        region.has([nextX + dy, nextY + dx].toString()) &&
        !region.has([nextX + dx, nextY + dy].toString())
      ) {
        nextX += dy;
        nextY += dx;
      }

      edgeCorners.add([nextX, nextY, dx, dy].toString());
    }
  }

  return edgeCorners.size;
};

let inRegion = new Set<string>();

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (inRegion.has([x, y].toString())) continue;

    const visited = new Set<string>();
    const region = getRegion([x, y], visited);
    inRegion = inRegion.union(region.plants);

    const area = region.plants.size;
    const sides = getSidesInRegion(region.plants);

    part1 += area * region.perimeter;
    part2 += area * sides;
  }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
