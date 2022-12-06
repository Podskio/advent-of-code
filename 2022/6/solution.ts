const input = await Deno.readTextFile("./input.txt");

const findPacket = (target: number) => {
  for (let i = target - 1; i < input.length; ++i) {
    const charSet = new Set(input.slice(i - target, i));

    if (charSet.size == target) return i;
  }
};

console.log("Part 1: " + findPacket(4));
console.log("Part 2: " + findPacket(14));
