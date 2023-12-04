const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let sumPartNumbers = 0;
let sumGearRatios = 0;

const symbols = [];
const nums = [];

const isSymbol = (c: string) => c.match(/[^0-9.]/g);

// Find coordinates of symbols and numbers
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (isSymbol(lines[i][j])) {
      symbols.push({
        symbol: lines[i][j],
        x: j,
        y: i,
      });
    } else if (parseInt(lines[i][j])) {
      const numStart = j;

      for (let k = j + 1; k <= lines[i].length; k++) {
        if (!lines[i][k] || (lines[i][k].match(/[^0-9]/g))) {
          j += k - numStart - 1;

          nums.push({
            value: lines[i].substring(numStart, k),
            x: numStart,
            y: i,
          });

          break;
        }
      }
    }
  }
}

type Coord = { x: number; y: number };

const isAdjacent = (num: Coord, symbol: Coord, numLen: number) => {
  const sameRow = symbol.y == num.y;
  const oneRowApart = Math.abs(symbol.y - num.y) == 1;
  const withinColRange = symbol.x >= num.x - 1 && symbol.x <= num.x + numLen;

  return (sameRow || oneRowApart) && withinColRange;
};

const gearNums: Record<string, number[]> = {};

// Find adjacent symbols for all numbers
for (const num of nums) {
  const numValue = parseInt(num.value);
  const adjacent = symbols.filter((s) => isAdjacent(num, s, num.value.length));

  if (adjacent.length > 0) sumPartNumbers += numValue;

  const gears = adjacent.filter((s) => s.symbol == "*");

  for (const gear of gears) {
    const coord = `${gear.x},${gear.y}`;
    if (gearNums[coord]) gearNums[coord].push(numValue);
    else gearNums[coord] = [numValue];
  }
}

// Calculate gear ratios
for (const nums of Object.values(gearNums)) {
  if (nums.length == 2) {
    sumGearRatios += nums[0] * nums[1];
  }
}

console.log("Part 1: " + sumPartNumbers);
console.log("Part 2: " + sumGearRatios);
