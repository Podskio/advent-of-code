const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = 0;

const findLargestBank = (bank: number[], batteries: number) => {
  let result = "";
  let next = 0;

  for (let p = batteries; p > 0; p--) {
    let max = 0;

    for (let i = next; i < bank.length - p + 1; i++) {
      if (bank[i] > max) {
        max = bank[i];
        next = i + 1;
      }
    }

    result += max.toString();
  }

  return parseInt(result);
};

for (const line of lines) {
  const digits = line.split("").map(Number);

  part1 += findLargestBank(digits, 2);
  part2 += findLargestBank(digits, 12);
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
