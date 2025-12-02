const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const ranges = input.split(",");

let part1 = 0;
let part2 = 0;

for (const range of ranges) {
  const [start, end] = range.split("-").map(Number);

  for (let i = start; i <= end; i += 1) {
    const id = i.toString();
    const half = id.length / 2;

    if (id.substring(0, half) === id.substring(half)) part1 += i;

    for (let s = 1; s <= half; s += 1) {
      const segment = id.substring(0, s);

      if (id.split(segment).every((s) => !s)) {
        part2 += i;
        break;
      }
    }
  }
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
