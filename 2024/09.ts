const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);

let part1 = 0;
let part2 = 0;

let id = 0;
const disk: number[] = [];

for (let i = 0; i < input.length; i++) {
  if (i % 2 == 0) {
    disk.push(...Array(parseInt(input[i])).fill(id));
    id++;
  } else {
    disk.push(...Array(parseInt(input[i])).fill(-1));
  }
}

id--;
const disk2 = disk.slice();

// Part 1
let freeStart = disk.indexOf(-1);
let lastNum = disk.findLastIndex((n) => n !== -1);
let lastFilled = 0;

while (lastNum > freeStart) {
  disk[freeStart] = disk[lastNum];
  disk.splice(lastNum, 1);

  lastFilled = freeStart;

  freeStart = disk.indexOf(-1, lastFilled);
  lastNum = disk.findLastIndex((n) => n !== -1);
}

// Part 2
let lastIdIndex = disk2.length;

const getNextFreeBlock = (start: number) => {
  let freeStart = -1;
  let freeEnd = -1;

  for (let i = start; i < disk2.length; i++) {
    if (disk2[i] === -1) {
      freeStart = i;
      break;
    }
  }

  for (let i = freeStart; i < disk2.length; i++) {
    if (disk2[i] !== -1) {
      freeEnd = i;
      break;
    }
  }

  return [freeStart, freeEnd];
};

while (id >= 0) {
  const idEnd = disk2.lastIndexOf(id, lastIdIndex);
  const idStart = disk2.indexOf(id, idEnd - 10);
  lastIdIndex = idStart;

  const blockSize = idEnd - idStart + 1;

  let freeStart = 0;
  let freeEnd = 0;
  while (freeEnd - freeStart < blockSize && freeEnd !== -1) {
    [freeStart, freeEnd] = getNextFreeBlock(freeEnd);
  }

  if (freeEnd - freeStart >= blockSize && freeStart < idStart) {
    disk2.fill(id, freeStart, freeStart + blockSize);
    disk2.fill(-1, idStart, idEnd + 1);
  }

  id--;
}

for (let i = 0; i < disk.length; i++) {
  if (disk[i] == -1) continue;
  part1 += i * disk[i];
}

for (let i = 0; i < disk2.length; i++) {
  if (disk2[i] == -1) continue;
  part2 += i * disk2[i];
}

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
