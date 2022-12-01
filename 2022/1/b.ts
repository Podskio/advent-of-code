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

totalCalories.sort();
console.log(
  totalCalories
    .slice(totalCalories.length - 3, totalCalories.length)
    .reduce((a, b) => a + b)
);
