const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);

const stones = new Map<number, number>();

const splitStone = (stone: number) => {
  const stoneString = stone.toString();
  const half = stoneString.length / 2;
  const left = parseInt(stoneString.substring(0, half));
  const right = parseInt(stoneString.substring(half));

  return [left, right];
};

const blink = (stones: Map<number, number>, blinks: number) => {
  for (let b = 0; b < blinks; b++) {
    const newStones = new Map<number, number>();

    const inc = (stone: number, count: number) => {
      newStones.set(stone, count + (newStones.get(stone) || 0));
    };

    for (const [stone, count] of stones) {
      if (stone == 0) inc(1, count);
      else if (stone.toString().length % 2 == 0) {
        const [left, right] = splitStone(stone);
        inc(left, count);
        inc(right, count);
      } else inc(stone * 2024, count);
    }

    stones = newStones;
  }

  let sum = 0;
  for (const count of stones.values()) sum += count;

  return sum;
};

for (const stone of input.split(" ").map(Number)) {
  stones.set(stone, 1);
}

console.log("Part 1: " + blink(stones, 25));
console.log("Part 2: " + blink(stones, 75));
