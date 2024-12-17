const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = 0;

const roomSize = [101, 103];
const halfX = Math.floor(roomSize[0] / 2);
const halfY = Math.floor(roomSize[1] / 2);
const quadrants = [
  [
    [0, 0],
    [halfX, halfY],
  ],
  [
    [halfX + 1, 0],
    [roomSize[0], halfY],
  ],
  [
    [0, halfY + 1],
    [halfX, roomSize[1]],
  ],
  [
    [halfX + 1, halfY + 1],
    [roomSize[0], roomSize[1]],
  ],
];

const isInQuadrant = (pos: number[], quadrant: number[][]) => {
  return (
    pos[0] >= quadrant[0][0] &&
    pos[0] < quadrant[1][0] &&
    pos[1] >= quadrant[0][1] &&
    pos[1] < quadrant[1][1]
  );
};

const quadrantCounts = [0, 0, 0, 0];
const positions = [];
let elapsed = 0;

for (const line of lines) {
  const [px, py, vx, vy] = line.match(/-?\d+/g)!.map(Number);
  positions.push([px, py, vx, vy]);
}

while (elapsed < 10000) {
  if (elapsed == 100) {
    for (const pos of positions) {
      for (let i = 0; i < 4; i++) {
        if (isInQuadrant(pos, quadrants[i])) {
          quadrantCounts[i]++;
        }
      }
    }

    part1 = quadrantCounts.reduce((a, b) => a * b, 1);
  }

  for (const position of positions) {
    const movedPos = [
      (position[0] + position[2]) % roomSize[0],
      (position[1] + position[3]) % roomSize[1],
    ];

    if (movedPos[0] < 0) movedPos[0] += roomSize[0];
    if (movedPos[1] < 0) movedPos[1] += roomSize[1];

    position[0] = movedPos[0];
    position[1] = movedPos[1];
  }

  const output = Array(roomSize[1])
    .fill([])
    .map(() => Array(roomSize[0]).fill("."));

  for (const position of positions) {
    output[position[1]][position[0]] = "#";
  }

  if (
    output
      .map((row) => row.join(""))
      .join("\n")
      .includes("#".repeat(30))
  ) {
    part2 = elapsed + 1;
    break;
  }

  elapsed++;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
