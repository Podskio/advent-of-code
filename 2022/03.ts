const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let priorities = 0;
let groupPriorities = 0;

const getPriority = (char: string) => {
  if (char.toUpperCase() == char)
    return char.charCodeAt(0) - "A".charCodeAt(0) + 27;
  else return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
};

for (const line of lines) {
  const left = line.substring(0, line.length / 2);
  const right = line.substring(line.length / 2);
  let shared = "";

  for (const char of left) if (right.includes(char)) shared = char;

  priorities += getPriority(shared);
}

for (let i = 0; i < lines.length; i += 3) {
  let shared = "";

  for (const char of lines[i])
    if (
      lines[i + 1].includes(char) &&
      lines[i + 2].includes(char) &&
      char !== "\r"
    )
      shared = char;

  groupPriorities += getPriority(shared);
}

console.log("Part 1: " + priorities);
console.log("Part 2: " + groupPriorities);
