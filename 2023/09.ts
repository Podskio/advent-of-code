const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let nextValueSum = 0;
let prevValueSum = 0;

const isAllZero = (array: number[]) => {
  const set = new Set(array);
  return set.size == 1 && set.has(0);
};

for (const line of lines) {
  let values = line.split(" ").map(Number);
  let differences = [];
  const history = [values];

  while (!isAllZero(differences)) {
    differences = [];

    // Calculate difference between each element
    for (let i = 0; i < values.length - 1; i++) {
      differences.push(values[i + 1] - values[i]);
    }

    values = differences;
    history.push(values);
  }

  for (let i = history.length - 1; i >= 0; i--) {
    const sequence = history[i];

    if (i == history.length - 1) {
      sequence.push(0);
      continue;
    }

    const first = sequence.at(0)!;
    const last = sequence.at(sequence.length - 1)!;

    const prevFirst = history[i + 1].at(0)!;
    const prevLast = history[i + 1].at(history[i + 1].length - 1);

    sequence.unshift(first - prevFirst);
    sequence.push(last + prevLast!);
  }

  const targetSeq = history[0];
  const firstNum = targetSeq.at(0)!;
  const lastNum = targetSeq.at(targetSeq.length - 1)!;

  prevValueSum += firstNum;
  nextValueSum += lastNum;
}

console.log("Part 1: " + nextValueSum);
console.log("Part 2: " + prevValueSum);
