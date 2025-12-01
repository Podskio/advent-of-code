const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let hitZero = 0;
let passedZero = 0;

let dial = 50;

const rotate = (current: number, distance: number) => {
  let newPos = current + distance;
  if (newPos < 0) newPos = 100 + (newPos % 100);
  if (newPos > 99) newPos = newPos % 100;
  return newPos;
};

for (const line of lines) {
  const direction = line.substring(0, 1);
  const distance = parseInt(line.substring(1));
  const move = direction === "L" ? -distance : distance;

  const start = dial;
  dial = rotate(dial, move);

  if (dial === 0) {
    hitZero++;
    passedZero++;
  }

  if (start === 0 && distance < 100) continue;

  let toZero = direction === "L" ? start : 100 - start;
  if (start === 0) toZero = 100;

  if (distance > toZero) {
    passedZero += Math.floor((distance - toZero) / 100) + 1;
    if (dial === 0) passedZero--;
  }
}

console.log("Part 1: " + hitZero);
console.log("Part 2: " + passedZero);
