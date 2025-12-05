const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n\n");

let ranges = lines[0].split("\n").map((r) => r.split("-").map(Number));
const ingredients = lines[1].split("\n").map(Number);

let part1 = 0;
let part2 = 0;

ranges = ranges.sort((a, b) => a[0] - b[0]);
const working = [ranges[0]];

for (const [start, end] of ranges.slice(1)) {
  let merged = false;

  for (let i = 0; i < working.length; i++) {
    const [workingStart, workingEnd] = working[i];

    if (start <= workingEnd + 1 && end >= workingStart - 1) {
      working[i] = [Math.min(start, workingStart), Math.max(end, workingEnd)];

      merged = true;
      break;
    }
  }

  if (!merged) working.push([start, end]);
}

for (const [start, end] of working) {
  part2 += end - start + 1;

  for (const ingredient of ingredients) {
    if (ingredient >= start && ingredient <= end) part1++;
  }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
