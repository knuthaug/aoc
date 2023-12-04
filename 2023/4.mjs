import { parse } from "path";
import { readFile } from "./lib.mjs";
const input = readFile("./input/4.txt");

const input2 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

export async function day4() {
  let sum = 0;
  const cards = parseCards(input);

  // part 1
  for (const card of cards) {
    sum += cardSum(card);
  }

  console.log("1:", sum);

  // part 2
  let sum2 = cards
    .map((card) => ({ amount: 1, card }))
    .reduce((sum, current, index, list) => {
      const wins = numberOfWins(current.card);
      list
        .slice(index + 1, index + 1 + wins)
        .forEach((card) => (card.amount += current.amount));
      return sum + current.amount;
    }, 0);

  console.log("2:", sum2);
}

function numberOfWins(card) {
  return card.yours.filter((x) => card.wins.includes(x)).length;
}

function cardSum(card) {
  let cardSum = 0;
  for (const number of card.wins) {
    if (card.yours.includes(number)) {
      cardSum = cardSum === 0 ? 1 : cardSum * 2;
    }
  }
  return cardSum;
}

function parseCards(input) {
  return input.map((line) => {
    const [wins, yours] = line
      .substring(line.indexOf(":") + 1)
      .trim()
      .split("|");
    return {
      wins: wins
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => Number(x)),
      yours: yours
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => Number(x)),
    };
  });
}
