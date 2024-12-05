const input = await Deno.readTextFile("./input.txt");
const sections = input.split("\n\n");

const rules = sections[0].split("\n").map((r) => r.split("|").map(Number));
const updates = sections[1].split("\n").map((p) => p.split(",").map(Number));

let part1 = 0;
let part2 = 0;

for (const update of updates) {
  let correct = true;

  const matchingRules = rules.filter((r) => r.every((n) => update.includes(n)));

  for (const num of update) {
    for (const [low, high] of matchingRules.filter((r) => num == r[0])) {
      const lowPos = update.indexOf(low);
      const highPos = update.indexOf(high);

      if (highPos < lowPos && highPos !== -1) {
        correct = false;

        // Move low before high
        update.splice(lowPos, 1);
        update.splice(highPos, 0, low);
      }
    }
  }

  const middle = update[(update.length - 1) / 2];

  if (correct) part1 += middle;
  else part2 += middle;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
