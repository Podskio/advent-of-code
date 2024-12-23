import { Counter } from "../helpers/counter.ts";

const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const nums = input.split("\n").map(BigInt);

let part1 = 0;
let part2 = 0;

const getSecretNumber = (num: bigint) => {
  num = ((num * BigInt(64)) ^ num) % BigInt(16777216);
  num = ((num / BigInt(32)) ^ num) % BigInt(16777216);
  return ((num * BigInt(2048)) ^ num) % BigInt(16777216);
};

const sequences = new Counter<string>();

for (let num of nums) {
  const sequence = [0, 0, 0, Number(num) % 10];
  const seen = new Set<string>();
  let prevPrice = Number(num) % 10;

  for (let i = 0; i < 2000; i++) {
    num = getSecretNumber(num);
    const price = Number(num) % 10;

    sequence.shift();
    sequence.push(price - prevPrice);
    prevPrice = price;

    const seqStr = sequence.toString();
    if (seen.has(seqStr)) continue;
    sequences.increment(seqStr, price);
    seen.add(seqStr);
  }

  part1 += parseInt(num.toString());
}

part2 = sequences.highest()[1];

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
