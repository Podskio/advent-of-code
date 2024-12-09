const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

// left to right -> bottom to top
const stacks = [
  ["B", "W", "N"],
  ["L", "Z", "S", "P", "T", "D", "M", "B"],
  ["Q", "H", "Z", "W", "R"],
  ["W", "D", "V", "J", "Z", "R"],
  ["S", "H", "M", "B"],
  ["L", "G", "N", "J", "H", "V", "P", "B"],
  ["J", "Q", "Z", "F", "H", "D", "L", "S"],
  ["W", "S", "F", "J", "G", "Q", "B"],
  ["Z", "W", "M", "S", "C", "D", "J"],
];
const stacks2 = [...stacks.map((s) => [...s])];

for (const line of lines) {
  if (line.substring(0, 4) !== "move") continue;

  const quantity = parseInt(line.split(" ")[1]);
  const from = parseInt(line.split(" ")[3]);
  const to = parseInt(line.split(" ")[5]);

  const fromStack = stacks[from - 1];
  const fromStack2 = stacks2[from - 1];
  const toStack = stacks[to - 1];
  const toStack2 = stacks2[to - 1];

  for (let i = 0; i < quantity; i++) {
    const crate = fromStack.pop();
    toStack.push(crate!);
  }

  const pickedUp = fromStack2.splice(fromStack2.length - quantity, quantity);
  toStack2.push(...pickedUp);
}

console.log("Part 1: " + stacks.map((s) => s[s.length - 1]).join(""));
console.log("Part 2: " + stacks2.map((s) => s[s.length - 1]).join(""));
