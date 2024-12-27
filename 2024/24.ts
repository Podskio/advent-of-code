const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const [initialValues, connections] = input.split("\n\n");

let part1 = 0;
let part2 = "";

const wireValues = new Map<string, number>();
const formulas = new Map<string, string[]>();

type Operation = (a: number, b: number) => number;

const ops: Record<string, Operation> = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  XOR: (a: number, b: number) => a ^ b,
};

for (const value of initialValues.split("\n")) {
  const [wire, state] = value.split(": ");
  wireValues.set(wire, parseInt(state));
}

for (const conn of connections.split("\n")) {
  const [a, op, b, out] = conn.replace("-> ", "").split(" ");
  formulas.set(out, [a, op, b]);
}

const evalWire = (wire: string): number => {
  if (wireValues.has(wire)) return wireValues.get(wire)!;
  const [a, op, b] = formulas.get(wire)!;

  const result = ops[op](evalWire(a), evalWire(b));
  wireValues.set(wire, result);

  return result;
};

for (const wire of formulas.keys()) evalWire(wire);

const bits = wireValues
  .keys()
  .filter((k) => k.startsWith("z"))
  .toArray()
  .sort()
  .reduce((acc, k) => wireValues.get(k) + acc, "");

part1 = parseInt(bits, 2);

// Part 2 solved manually using helpers
const printWire = (wire: string, depth = 1): string => {
  if ("xy".includes(wire[0])) return "| ".repeat(depth) + wire;
  const [a, op, b] = formulas.get(wire)!;
  const aWire = printWire(a, depth + 1);
  const bWire = printWire(b, depth + 1);

  return "| ".repeat(depth) + `${op} ${wire}\n${aWire}\n${bWire}`;
};

// ksv <-> z06
// nbd <-> kbs
// z20 <-> tqq
// z39 <-> ckb

const swaps = ["z06", "ksv", "nbd", "kbs", "z20", "tqq", "z39", "ckb"];
part2 = swaps.sort().join(",");

console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
