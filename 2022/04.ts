const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let containedPairs = 0;
let overlappingPairs = 0;

for (const line of lines) {
  const [left, right] = line.split(",");
  const [firstLower, firstUpper] = left.split("-").map(Number);
  const [secondLower, secondUpper] = right.split("-").map(Number);

  if (
    (firstLower <= secondLower && secondUpper <= firstUpper) ||
    (secondLower <= firstLower && firstUpper <= secondUpper)
  )
    containedPairs++;

  if (
    (firstLower <= secondLower && secondLower <= firstUpper) ||
    (secondLower <= firstLower && firstLower <= secondUpper)
  )
    overlappingPairs++;
}

console.log("Part 1: " + containedPairs);
console.log("Part 2: " + overlappingPairs);
