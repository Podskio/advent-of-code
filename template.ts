const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");
// const grid = Grid.fromString(lines);

let part1 = 0;
let part2 = 0;

//

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
