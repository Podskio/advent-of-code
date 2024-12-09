const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

const cd = [];
const directories = new Map<string, number>();
const files = new Map<string, number>();

for (const line of lines) {
  if (line.substring(0, 4) === "$ cd") {
    const location = line.split(" ")[2].trim();

    if (location == "..") cd.pop();
    else if (location !== "/") cd.push(location);

    directories.set("/" + cd.join("/"), 0);
  } else if (line.match(/^[0-9]/g)) {
    const fileSize = parseInt(line.split(" ")[0]);
    const fileName = line.split(" ")[1].trim();
    const pathPrefix = cd.length == 0 ? "" : "/";
    const filePath = pathPrefix + cd.join("/") + "/" + fileName;

    files.set(filePath, fileSize);
  }
}

for (const [dirName] of directories) {
  let dirSize = 0;

  for (const [fileName, fileSize] of files)
    if (fileName.slice(0, dirName.length) == dirName) dirSize += fileSize;

  directories.set(dirName, dirSize);
}

let sum = 0;
const maxSize = 100000;
directories.forEach((dirSize) => {
  if (dirSize <= maxSize) sum += dirSize;
});

console.log("Part 1: " + sum);

const currentSpace = directories.get("/")!;
const unusedSpace = 70000000 - currentSpace;
const minimumNeededSpace = 30000000 - unusedSpace;

let directoryArray = Array.from(directories.values());
directoryArray.sort((a, b) => a - b);
directoryArray = directoryArray.filter(
  (dirSize) => dirSize >= minimumNeededSpace
);

console.log("Part 2: " + directoryArray[0]);
