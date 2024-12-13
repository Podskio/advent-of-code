const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n\n");
const machines = lines.map((l) => l.split("\n"));

let part1 = 0;
let part2 = 0;

const getNums = (input: string) => input.match(/\d+/g)!.map(Number);

const bigPrizeOffset = 10000000000000;

// [a0 b0] [x] = [p0]
// [a1 b1] [y] = [p1]
const getMinPresses = (
  buttonA: number[],
  buttonB: number[],
  prize: number[]
) => {
  const det = buttonA[0] * buttonB[1] - buttonA[1] * buttonB[0];
  const detA = prize[1] * buttonA[0] - prize[0] * buttonA[1];
  const detB = prize[0] * buttonB[1] - prize[1] * buttonB[0];

  if (detA % det !== 0 || detB % det !== 0) return [0, 0];

  const a = detB / det;
  const b = detA / det;

  return [a, b];
};

for (const machine of machines) {
  const buttonA = getNums(machine[0]);
  const buttonB = getNums(machine[1]);
  const prize = getNums(machine[2]);
  const bigPrize = [prize[0] + bigPrizeOffset, prize[1] + bigPrizeOffset];

  const [a1, b1] = getMinPresses(buttonA, buttonB, prize);
  const [a2, b2] = getMinPresses(buttonA, buttonB, bigPrize);

  if (a1 <= 100 && b1 <= 100) part1 += 3 * a1 + b1;
  part2 += 3 * a2 + b2;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
