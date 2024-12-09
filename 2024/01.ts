const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

const left = [];
const right = [];

let part1 = 0;
let part2 = 0;

for (const line of lines) {
  const [leftNum, rightNum] = line.split(" ").filter(Boolean).map(Number);
  left.push(leftNum);
  right.push(rightNum);
}

left.sort();
right.sort();

for (let i = 0; i < left.length; i++) {
  const leftNum = left[i];
  const rightNum = right[i];
  const rightMatches = right.filter((n) => n === leftNum);

  part1 += Math.abs(leftNum - rightNum);
  part2 += leftNum * rightMatches.length;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
