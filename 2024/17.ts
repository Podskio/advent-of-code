const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let regA = parseInt(lines[0].split(": ")[1]);
let regB = parseInt(lines[1].split(": ")[1]);
let regC = parseInt(lines[2].split(": ")[1]);

const program = lines[4].split(": ")[1].split(",").map(Number);

const comboOperand = (operand: number) => {
  if (operand >= 0 && operand <= 3) return operand;
  if (operand === 4) return regA;
  if (operand === 5) return regB;
  if (operand === 6) return regC;
  return -1;
};

let instruction = 0;
const output = [];

while (instruction < program.length) {
  const opcode = program[instruction];
  const operand = program[instruction + 1];
  const combo = comboOperand(operand);

  if (opcode == 0) regA >>= combo;
  else if (opcode == 1) regB ^= operand;
  else if (opcode == 2) regB = combo % 8;
  else if (opcode == 3 && regA != 0) {
    instruction = operand;
    continue;
  } else if (opcode == 4) regB ^= regC;
  else if (opcode == 5) output.push(combo % 8);
  else if (opcode == 6) regB = regA >> combo;
  else if (opcode == 7) regC = regA >> combo;

  instruction += 2;
}

const findQuine = (program: number[], ans: bigint): bigint | undefined => {
  if (program.length == 0) return ans;

  for (let i = 0; i < 8; i++) {
    const a = (ans << BigInt(3)) + BigInt(i);
    let b = a % BigInt(8);
    b ^= BigInt(5);
    const c = a >> b;
    b ^= c;
    b ^= BigInt(6);

    if (Number(b % BigInt(8)) == program.at(-1)) {
      const sub = findQuine(program.slice(0, -1), a);
      if (!sub) continue;
      return sub;
    }
  }
};

console.log("Part 1: " + output.join(","));
console.log("Part 2: " + findQuine(program, BigInt(0)));
