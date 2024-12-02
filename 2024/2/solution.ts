const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let safeReports = 0;
let dampenedSafeReports = 0;

const isValidReport = (report: number[]) => {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] > report[i + 1]) increasing = false;
    if (report[i] < report[i + 1]) decreasing = false;

    const step = Math.abs(report[i] - report[i + 1]);
    if (step < 1 || step > 3) return false;
  }

  return increasing || decreasing;
};

for (const line of lines) {
  const levels = line.split(" ").map((x) => parseInt(x));

  if (isValidReport(levels)) safeReports++;
  else {
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.slice();
      newLevels.splice(i, 1);

      if (isValidReport(newLevels)) {
        dampenedSafeReports++;
        break;
      }
    }
  }
}

console.log("Part 1: " + safeReports);
console.log("Part 2: " + (safeReports + dampenedSafeReports));
