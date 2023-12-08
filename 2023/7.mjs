import { readFile } from "./lib.mjs";
const input = readFile("./input/7.txt");

const input2 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`.split("\n");

export async function day7() {
  let sum = 0;

  const hands = parseInput(input2);
  //console.log(hands);
  for (let i = 0; i < hands.length; i++) {
    sum += hands[i].bid * (i + 1);
  }

  console.log("1: ", sum);

  const hands2 = parseInput(input2, 1);
  //console.log(hands2);

  let sum2 = 0;
  for (let i = 0; i < hands2.length; i++) {
    sum2 += hands2[i].bid * (i + 1);
  }

  console.log("2: ", sum2);
}

function parseInput(input, jValue = 11) {
  const hands = [];
  for (let line of input) {
    const parts = line.split(" ");
    hands.push({
      ...typeOfHand(mapHand(parts[0], jValue)),
      hand:
        jValue !== 11
          ? jokerHand(mapHand(parts[0], jValue))
          : mapHand(parts[0]),
      orighand: mapHand(parts[0], jValue),
      bid: Number(parts[1]),
    });
  }
  return hands.sort((a, b) => {
    return (
      b.order - a.order ||
      a.hand[0] - b.hand[0] ||
      a.hand[1] - b.hand[1] ||
      a.hand[2] - b.hand[2] ||
      a.hand[3] - b.hand[3] ||
      a.hand[4] - b.hand[4]
    );
  });
}

function jokerHand(hand) {
  const jokers = hand.filter((c) => c === 11);
  const nonJokers = hand.filter((c) => c !== 11);
  const sortedHand = hand.sort((a, b) => b - a);
  //console.log(sortedHand);
  if (jokers.length === 0) {
    return hand;
  }
  if (jokers.length === 1) {
    return hand.slice(
      hand.findIndex((c) => c === 11),
      1,
      sortedHand[0],
    );
  }
  if (jokers.length === 2) {
    return nonJokers.sort((a, b) => a - b);
  }
  if (jokers.length === 3) {
    return nonJokers.sort((a, b) => a - b);
  }
  if (jokers.length === 4) {
    return nonJokers.sort((a, b) => a - b);
  }
  if (jokers.length === 5) {
    return nonJokers.sort((a, b) => a - b);
  }
}

function typeOfHand(hand) {
  const [a, b, c, d, e] = hand.sort((a, b) => a - b);
  if (a === b && b === c && c === d && d === e) {
    return { name: "five", order: 1 };
  }

  if ((a === b && b === c && c === d) || (b === c && c === d && d === e)) {
    return { name: "four", order: 2 };
  }
  if ((a === b && b === c && d === e) || (a === b && c === d && d === e)) {
    return { name: "house", order: 3 };
  }

  if ((a === b && b === c) || (b === c && c === d) || (c === d && d === e)) {
    return { name: "three", order: 4 };
  }
  if ((a === b && c === d) || (a === b && d === e) || (b === c && d === e)) {
    return { name: "twopair", order: 5 };
  }
  if (a === b || b === c || c === d || d === e) {
    return { name: "pair", order: 6 };
  }
  return { name: "card", order: 7 };
}

function mapHand(hand, jValue = 11) {
  return hand.split("").map((c) => {
    switch (c) {
      case "A":
        return 14;
      case "J":
        return jValue;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "T":
        return 10;
      default:
        return Number(c);
    }
  });
}
