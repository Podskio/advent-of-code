const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

type Bag = Record<string, number>;

const bagTotalCubes: Bag = {
  "red": 12,
  "green": 13,
  "blue": 14,
};

let possibleGameIdSum = 0;
let minCubePowerSum = 0;

for (const line of lines) {
  const gameId = line.split(": ")[0].substring(5);
  const rounds = line.split(": ")[1].split(";").filter(Boolean);

  let gamePossible = true;

  const maxCubes: Bag = {
    "red": 0,
    "green": 0,
    "blue": 0,
  };

  for (const round of rounds) {
    const bagColors = round.trim().split(", ");

    const roundCubes: Bag = {
      "red": 0,
      "green": 0,
      "blue": 0,
    };

    for (const bagColor of bagColors) {
      const [amount, color] = bagColor.split(" ");
      const amountInt = parseInt(amount);

      roundCubes[color] += amountInt;

      if (amountInt > maxCubes[color]) maxCubes[color] = amountInt;
    }

    for (const [color, amount] of Object.entries(bagTotalCubes)) {
      if (roundCubes[color] > amount) gamePossible = false;
    }
  }

  if (gamePossible) possibleGameIdSum += parseInt(gameId);

  minCubePowerSum += Object.values(maxCubes).reduce((p, c) => p * c);
}

console.log("Part 1: " + possibleGameIdSum);
console.log("Part 2: " + minCubePowerSum);
