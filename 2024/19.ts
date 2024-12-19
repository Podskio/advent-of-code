const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n\n");

const patterns = lines[0].split(", ");
const designs = lines[1].split("\n");

let part1 = 0;
let part2 = 0;

const cache = new Map<string, number>();

const makeDesign = (design: string) => {
  if (design == "") return 1;
  if (cache.has(design)) return cache.get(design)!;

  let options = 0;

  for (const pattern of patterns)
    if (design.startsWith(pattern))
      options += makeDesign(design.substring(pattern.length));

  cache.set(design, options);
  return options;
};

for (const design of designs) {
  const designs = makeDesign(design);
  if (designs > 0) part1++;
  part2 += designs;
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
