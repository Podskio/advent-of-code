const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((l) => l.split(""));

const antennas = new Set<string>(input.replaceAll(/\.|\s/g, ""));
const closeAntinodes = new Set<string>();
const allAntinodes = new Set<string>();

type Coords = [number, number];

const arrAdd = (a: Coords, b: Coords): Coords => {
  return [a[0] + b[0], a[1] + b[1]];
};

const arrSub = (a: Coords, b: Coords): Coords => {
  return [a[0] - b[0], a[1] - b[1]];
};

const isInGrid = (coords: Coords) =>
  coords[0] >= 0 &&
  coords[0] < grid[0].length &&
  coords[1] >= 0 &&
  coords[1] < grid.length;

const getAntennas = (letter: string) => {
  const coords: Coords[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == letter) coords.push([x, y]);
    }
  }
  return coords;
};

for (const antenna of antennas) {
  const nodes = getAntennas(antenna);
  const pairs: Coords[][] = [];

  for (const node of nodes) allAntinodes.add(node.join(","));

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i; j < nodes.length; j++) {
      if (i == j) continue;
      pairs.push([nodes[i], nodes[j]] as Coords[]);
    }
  }

  for (let [pairA, pairB] of pairs) {
    const offset = arrSub(pairA, pairB);

    let antiA = arrAdd(pairA, offset);
    let antiB = arrSub(pairB, offset);

    if (isInGrid(antiA)) closeAntinodes.add(antiA.join(","));
    if (isInGrid(antiB)) closeAntinodes.add(antiB.join(","));

    while (isInGrid(pairA) || isInGrid(pairB)) {
      antiA = arrAdd(pairA, offset);
      antiB = arrSub(pairB, offset);

      if (isInGrid(antiA)) allAntinodes.add(antiA.join(","));
      if (isInGrid(antiB)) allAntinodes.add(antiB.join(","));

      pairA = antiA;
      pairB = antiB;
    }
  }
}

console.log("Part 1: " + closeAntinodes.size);
console.log("Part 2: " + allAntinodes.size);
