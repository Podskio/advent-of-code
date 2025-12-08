const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = 0;

let distances: number[][] = [];
const boxes = lines.map((l) => l.split(",").map(Number));
const circuits = boxes.map((_, i) => [i]);

const distance = (a: number[], b: number[]) =>
  (a[0] - b[0]) * (a[0] - b[0]) +
  (a[1] - b[1]) * (a[1] - b[1]) +
  (a[2] - b[2]) * (a[2] - b[2]);

for (let a = 0; a < boxes.length; a++) {
  for (let b = a + 1; b < boxes.length; b++) {
    const boxA = boxes[a];
    const boxB = boxes[b];

    distances.push([a, b, distance(boxA, boxB)]);
  }
}

distances = distances.sort(([, , a], [, , b]) => a - b);

for (let i = 0; i < 1000; i++) {
  const shortest = distances.shift()!;

  const merge = circuits.findIndex((c) => c.includes(shortest[0]));
  const remove = circuits.findIndex((c) => c.includes(shortest[1]));
  if (merge == remove) continue;

  circuits[merge].push(...circuits[remove]);
  circuits.splice(remove, 1);
}

part1 = circuits
  .sort((a, b) => a.length - b.length)
  .slice(-3)
  .reduce((a, b) => a * b.length, 1);

while (true) {
  const shortest = distances.shift()!;
  const merge = circuits.findIndex((c) => c.includes(shortest[0]));
  const remove = circuits.findIndex((c) => c.includes(shortest[1]));

  if (merge == remove) continue;

  circuits[merge].push(...circuits[remove]);
  circuits.splice(remove, 1);

  if (circuits.length == 1) {
    part2 = boxes[shortest[0]][0] * boxes[shortest[1]][0];
    break;
  }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
