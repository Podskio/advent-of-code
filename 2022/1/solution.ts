const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const totalCalories = [];
let currentElf = 0;

for (const line of lines) {
  if (line == "\r") {
    totalCalories.push(currentElf);
    currentElf = 0;
  } else currentElf += parseInt(line);
}

totalCalories.sort((a, b) => b - a);

console.log("Part 1: " + totalCalories[0]);
console.log("Part 2: " + totalCalories.slice(0, 3).reduce((a, b) => a + b));
