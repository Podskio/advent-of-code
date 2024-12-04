const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const grid = lines.map((l) => l.split(""));

let part1 = 0;
let part2 = 0;

const directions = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];

const word = "XMAS";
const wordRev = word.split("").reverse().join("");

const isInGrid = (x: number, y: number) => {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
};

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    for (const [dx, dy] of directions) {
      let sub = "";
      let i = 0;

      while (i < word.length && isInGrid(x + dx * i, y + dy * i)) {
        sub += grid[y + dy * i][x + dx * i];
        i++;
      }

      if (sub == word || sub == wordRev) part1++;
    }

    if (x + 2 >= grid[y].length || y + 2 >= grid.length) continue;

    const cross = [
      [grid[y][x], grid[y + 1][x + 1], grid[y + 2][x + 2]].join(""),
      [grid[y][x + 2], grid[y + 1][x + 1], grid[y + 2][x]].join(""),
    ];

    if (cross.every((c) => c == "MAS" || c == "SAM")) part2++;
  }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
