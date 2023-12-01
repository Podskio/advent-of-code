const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let p1Total = 0;
let p2Total = 0;

for (const line of lines) {
  let firstDigit = "";
  let lastDigit = "";

  for (let i = 0; i <= line.length; i++) {
    let num = "";

    if (Number(line.charAt(i))) {
      num = line.charAt(i);
    }

    if (!firstDigit && num) {
      firstDigit = num;
      lastDigit = num;
    } else if (num) {
      lastDigit = num;
    }
  }

  p1Total += parseInt(firstDigit + lastDigit);
}

for (let line of lines) {
  line = line
    .replaceAll("one", "o1e")
    .replaceAll("two", "t2o")
    .replaceAll("three", "t3e")
    .replaceAll("four", "f4r")
    .replaceAll("five", "f5e")
    .replaceAll("six", "s6x")
    .replaceAll("seven", "s7n")
    .replaceAll("eight", "e8t")
    .replaceAll("nine", "n9e");

  let firstDigit = "";
  let lastDigit = "";

  for (let i = 0; i <= line.length; i++) {
    let num = "";

    if (Number(line.charAt(i))) {
      num = line.charAt(i);
    }

    if (!firstDigit && num) {
      firstDigit = num;
      lastDigit = num;
    } else if (num) {
      lastDigit = num;
    }
  }

  p2Total += parseInt(firstDigit + lastDigit);
}

console.log("Part 1: " + p1Total);
console.log("Part 2: " + p2Total);
