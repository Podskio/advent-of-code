const day = import.meta.filename?.split("/").pop()?.split(".")[0];
const input = Deno.readTextFileSync(`${day}.txt`);
const lines = input.split("\n");

let totalPoints = 0;
let totalCards = 0;

const cardMatches = new Map<number, number>();

for (const card of lines) {
  const cardId = parseInt(card.split(":")[0].split("Card")[1]);
  const cardNums = card.split(": ")[1];

  const winningNums = cardNums.split(" | ")[0].split(" ").filter(Boolean);
  const haveNums = cardNums.split(" | ")[1].split(" ").filter(Boolean);
  const matches = winningNums.filter((e) => haveNums.includes(e));

  // Add points of card to total
  totalPoints += Math.floor(Math.pow(2, matches.length - 1));

  // Add number of card matches to map
  cardMatches.set(cardId, matches.length);
}

const getRecursiveMatches = (cardId: number) => {
  // Start with 1 for the initial card
  let numCards = 1;

  const matches = cardMatches.get(cardId);
  if (!matches) return 1;

  for (let i = 1; i <= matches; i++) {
    numCards += getRecursiveMatches(i + cardId);
  }

  return numCards;
};

// Compute number of matches for all cards recursively
for (const card of lines) {
  const cardId = parseInt(card.split(":")[0].split("Card")[1]);
  const matches = getRecursiveMatches(cardId);

  totalCards += matches;
}

console.log("Part 1: " + totalPoints);
console.log("Part 2: " + totalCards);
