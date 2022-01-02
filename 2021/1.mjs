import { readFile } from "./lib.mjs";

const rawInput = readFile("./inputs/1.txt");
const input = rawInput.map((num) => parseInt(num, 10));

export function day1() {
  let increases = 0;
  let slidingIncreases = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases++;
    }
  }

  for (let i = 0; i < input.length - 3; i++) {
    const set1 = input.slice(i, i + 3).reduce((a, b) => a + b, 0);
    const set2 = input.slice(i + 1, i + 4).reduce((a, b) => a + b, 0);
    if (set2 > set1) {
      slidingIncreases++;
    }
  }
  console.log("1: ", increases);
  console.log("2: ", slidingIncreases);
}
