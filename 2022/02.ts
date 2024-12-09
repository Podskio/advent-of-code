const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let score1 = 0;
let score2 = 0;

const rps: { [key: string]: { [key: string]: number } } = {
  A: { X: 3 + 1, Y: 6 + 2, Z: 0 + 3 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 6 + 1, Y: 0 + 2, Z: 3 + 3 },
};

const rpsReverse: { [key: string]: { [key: string]: number } } = {
  A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
};

for (const line of lines) {
  const opponent = line.charAt(0);
  const you = line.charAt(2);

  score1 += rps[opponent][you];
  score2 += rpsReverse[opponent][you];
}

console.log("Part 1: " + score1);
console.log("Part 2: " + score2);
