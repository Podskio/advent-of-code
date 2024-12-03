const input = await Deno.readTextFile("./input.txt");

let part1 = 0;
let part2 = 0;

const muls = input.matchAll(/mul\(\d+,\d+\)/g).toArray();
const conditionals = input.matchAll(/do\(\)|don't\(\)/g).toArray();

for (const mul of muls) {
  const args = mul[0]
    .replaceAll(/mul\(|\)/g, "")
    .split(",")
    .map(Number);

  const lastConditional = conditionals.findLast((c) => c.index < mul.index);

  part1 += args[0] * args[1];

  if (!lastConditional || lastConditional[0] == "do()")
    part2 += args[0] * args[1];
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
