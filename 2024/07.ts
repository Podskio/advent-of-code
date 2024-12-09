const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let part1 = 0;
let part2 = 0;

const canSolve = (target: number, current: number, nums: number[]): boolean => {
  if (current == target && nums.length == 0) return true;
  if (current > target || nums.length == 0) return false;

  const nextNums = nums.slice(1);

  return (
    canSolve(target, current * nums[0], nextNums) ||
    canSolve(target, current + nums[0], nextNums)
  );
};

const concatOp = (left: number, right: number) => {
  return parseInt(left.toString() + right.toString());
};

const canSolveWithConcat = (
  target: number,
  current: number,
  nums: number[]
): boolean => {
  if (current == target && nums.length == 0) return true;
  if (current > target || nums.length == 0) return false;

  const nextNums = nums.slice(1);

  return (
    canSolveWithConcat(target, current * nums[0], nextNums) ||
    canSolveWithConcat(target, current + nums[0], nextNums) ||
    canSolveWithConcat(target, concatOp(current, nums[0]), nextNums)
  );
};

for (const line of lines) {
  const [total, ...nums] = line.split(/:|\s/g).filter(Boolean).map(Number);
  const first = nums[0];

  if (canSolve(total, first, nums.slice(1))) part1 += total;
  if (canSolveWithConcat(total, first, nums.slice(1))) part2 += total;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
