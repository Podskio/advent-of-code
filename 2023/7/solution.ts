const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

let totalWinnings = 0;
let totalWinningsWithJoker = 0;

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

// Move J to end of array
const cardsWithJoker = cards.filter((c) => c != "J");
cardsWithJoker.push("J");

// Find the ordering of two hands based on given card priority
const sortHandsByCards = (a: string[], b: string[], useWeakJoker = false) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == b[i]) continue;

    const cardSorting = useWeakJoker ? cardsWithJoker : cards;

    const aStrength = cardSorting.findIndex((c) => c == a[i]);
    const bStrength = cardSorting.findIndex((c) => c == b[i]);

    return aStrength < bStrength ? 1 : -1;
  }

  return 0;
};

// Return a number indicating the strength of the hand
// where a higher number is a stronger hand
const getHandStrength = (cards: string[]) => {
  const cardQuantity = new Map<string, number>();

  // Find the amount of every card
  for (const card of cards) {
    const existing = cardQuantity.get(card);

    if (existing) cardQuantity.set(card, existing + 1);
    else cardQuantity.set(card, 1);
  }

  for (const quantity of cardQuantity.values()) {
    // Five of a kind
    if (quantity == 5) return 7;
    // Four of a kid
    else if (quantity == 4) return 6;
  }

  // Full house
  let hasTwoPair = false;
  for (const cardAmt of cardQuantity.values()) {
    if (cardAmt == 2) hasTwoPair = true;
  }
  for (const cardAmt of cardQuantity.values()) {
    if (cardAmt == 3 && hasTwoPair) return 5;
  }

  // Three of a kind
  for (const cardAmt of cardQuantity.values()) {
    if (cardAmt == 3) return 4;
  }

  // Two pair
  let twoPairs = 0;
  for (const cardAmt of cardQuantity.values()) {
    if (cardAmt == 2) twoPairs++;
  }
  if (twoPairs == 2) return 3;

  // One pair
  for (const cardAmt of cardQuantity.values()) {
    if (cardAmt == 2) return 2;
  }

  // High card
  return 1;
};

interface Hand {
  cards: string[];
  strength: number;
  bid: number;
}

const hands: Hand[] = [];
const handsWithJoker: Hand[] = [];

for (const hand of lines) {
  const cards = hand.split(" ")[0].split("");
  const bid = parseInt(hand.split(" ")[1]);
  const strength = getHandStrength(cards);

  hands.push({ cards, strength, bid });

  // Generate possible variants if a joker is present
  const variants: string[] = [cards.join("")];

  for (const card of cards) {
    if (card == "J") continue;

    const variant = cards.map((c) => c.replaceAll("J", card)).join("");
    if (!variants.includes(variant)) variants.push(variant);
  }

  // Find best variant
  let bestHand = 0;
  for (const variant of variants) {
    const variantStrength = getHandStrength(variant.split(""));
    if (variantStrength > bestHand) {
      bestHand = variantStrength;
    }
  }

  handsWithJoker.push({ cards, strength: bestHand, bid });
}

// Sort by strength and card priority
hands.sort((a, b) =>
  (a.strength == b.strength)
    ? sortHandsByCards(a.cards, b.cards)
    : (a.strength < b.strength ? -1 : 1)
);

handsWithJoker.sort((a, b) =>
  (a.strength == b.strength)
    ? sortHandsByCards(a.cards, b.cards, true)
    : (a.strength < b.strength ? -1 : 1)
);

for (let i = 0; i < hands.length; i++) {
  totalWinnings += (i + 1) * hands[i].bid;
  totalWinningsWithJoker += (i + 1) * handsWithJoker[i].bid;
}

console.log("Part 1: " + totalWinnings);
console.log("Part 2: " + totalWinningsWithJoker);
