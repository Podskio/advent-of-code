const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

const seeds = lines[0].split("seeds: ")[1].split(" ").map(Number);

const maps: Map<string, [number, number, number][]> = new Map();
let currentMap = "";

// Extract range data for maps
for (const line of lines) {
  if (line.startsWith("seeds: ")) continue;

  if (line.charAt(0).match(/[a-z]/g)) {
    maps.set(line.split(" ")[0], []);
    currentMap = line.split(" ")[0];
  } else if (line.charAt(0).match(/[0-9]/g) && currentMap) {
    const destination = parseInt(line.split(" ")[0]);
    const source = parseInt(line.split(" ")[1]);
    const range = parseInt(line.split(" ")[2]);

    const existing = maps.get(currentMap);

    if (existing) {
      existing.push([destination, source, range]);
      maps.set(currentMap, existing);
    } else {
      maps.set(currentMap, [[destination, source, range]]);
    }
  }
}

const getDestFromSrc = (n: number, mapName: string) => {
  const mapEntries = maps.get(mapName)!;

  for (const [destination, source, range] of mapEntries) {
    if (n >= source && n <= source + range) {
      const difference = n - source;
      return destination + difference;
    }
  }

  return n;
};

const getSrcFromDest = (n: number, map: string) => {
  const mapEntries = maps.get(map)!;

  for (const [destination, source, range] of mapEntries) {
    if (n >= destination && n <= destination + range) {
      const difference = Math.abs(destination - n);
      return difference + source;
    }
  }

  return n;
};

const getLocationFromSeed = (seed: number) => {
  let value = seed;
  for (const map of maps) {
    value = getDestFromSrc(value, map[0]);
  }

  return value;
};

const reverseMaps: string[] = [];
for (const map of maps) reverseMaps.push(map[0]);
reverseMaps.reverse();

const getSeedFromLocation = (location: number) => {
  let value = location;

  for (const map of reverseMaps) {
    value = getSrcFromDest(value, map);
  }

  return value;
};

let smallestSeedLocation = 0;

for (const seed of seeds) {
  const location = getLocationFromSeed(seed);

  if (!smallestSeedLocation || location < smallestSeedLocation) {
    smallestSeedLocation = location;
  }
}

console.log("Part 1: " + smallestSeedLocation);

let smallestSeedRangeLocation = 0;

let i = 0;
while (smallestSeedRangeLocation == 0) {
  const seed = getSeedFromLocation(i);

  for (let s = 0; s < seeds.length; s += 2) {
    const start = seeds[s];
    const range = seeds[s + 1];

    if (seed >= start && seed <= start + range) {
      smallestSeedRangeLocation = i;
      break;
    }
  }

  i++;
}

console.log("Part 2: " + smallestSeedRangeLocation);
