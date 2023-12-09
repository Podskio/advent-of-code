const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let stepsZZZ = 0;
let lcmStepsEndZ = 1;

const directions = lines[0].split("");

// node, [left, right]
const map = new Map<string, [string, string]>();

for (const line of lines.slice(2)) {
  const node = line.substring(0, 3);
  const left = line.substring(7, 10);
  const right = line.substring(12, 15);

  map.set(node, [left, right]);
}

let foundZZZ = false;
let currentElem = "AAA";

while (!foundZZZ) {
  for (const direction of directions) {
    currentElem = map.get(currentElem)![direction == "L" ? 0 : 1];

    stepsZZZ++;

    if (currentElem == "ZZZ") {
      foundZZZ = true;
      break;
    }
  }
}

// Find all nodes that end with A, which will be all starting nodes
const endsWithA = [];
for (const name of map.keys()) {
  if (name.endsWith("A")) endsWithA.push(name);
}

let foundAllEndZ = false;
const currentElems: Record<number, string> = {};

// Interation, steps to --Z
const requiredSteps = new Map<number, number>();

let stepsEndZ = 0;

while (!foundAllEndZ) {
  for (const direction of directions) {
    for (let i = 0; i < endsWithA.length; i++) {
      if (requiredSteps.has(i)) continue;

      const startNode = endsWithA[i];
      let currentNode = currentElems[i];
      if (!currentNode) currentNode = startNode;

      currentElems[i] = map.get(currentNode)![direction == "L" ? 0 : 1];

      if (currentElems[i].endsWith("Z")) {
        requiredSteps.set(i, stepsEndZ + 1);
      }
    }

    stepsEndZ++;

    if (requiredSteps.size == endsWithA.length) {
      foundAllEndZ = true;
      break;
    }
  }
}

// Greatest common divisor
const gcd = (a: number, b: number): number => {
  const remainder = a % b;
  if (remainder == 0) return b;
  return gcd(b, remainder);
};

// Least common multiple
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

for (const steps of requiredSteps.values()) {
  lcmStepsEndZ = lcm(lcmStepsEndZ, steps);
}

console.log("Part 1: " + stepsZZZ);
console.log("Part 2: " + lcmStepsEndZ);
