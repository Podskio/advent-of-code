const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let mostCalories = 0;
let currentElf = 0;

for (const line of lines) {
  if (line == "\r") {
    if (currentElf > mostCalories) mostCalories = currentElf;
    currentElf = 0;
  } else currentElf += parseInt(line);
}

console.log(mostCalories);
