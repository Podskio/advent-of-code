const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const times = lines[0].split("Time:")[1].split(" ").filter(Boolean);
const distances = lines[1].split("Distance:")[1].split(" ").filter(Boolean);

const timeNumbers = times.map(Number);
const distanceNumbers = distances.map(Number);

const singleTime = parseInt(times.join(""));
const singleDistance = parseInt(distances.join(""));

let multipleRaceWinProduct = 1;
let singleRaceWinProduct = 1;

const findNumberWinMethods = (maxTime: number, recordDistance: number) => {
  let methods = 0;

  for (let t = 1; t < maxTime; t++) {
    const timeMoving = maxTime - t;
    const distanceMoved = t * timeMoving;

    if (distanceMoved > recordDistance) methods++;
  }

  return methods;
};

for (let i = 0; i < timeNumbers.length; i++) {
  const maxTime = timeNumbers[i];
  const recordDistance = distanceNumbers[i];

  multipleRaceWinProduct *= findNumberWinMethods(maxTime, recordDistance);
}

singleRaceWinProduct = findNumberWinMethods(singleTime, singleDistance);

console.log("Part 1: " + multipleRaceWinProduct);
console.log("Part 2: " + singleRaceWinProduct);
