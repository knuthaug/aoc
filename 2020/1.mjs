import { input } from "./input.mjs";

const entries = input("1.txt").map((num) => parseInt(num, 10));

//const entries = [1721, 979, 366, 299, 675, 1456];

let factors = [];

for (let i = 0; i < entries.length; i++) {
  const first = entries[i];
  for (let j = i; j < entries.length; j++) {
    const sum = first + entries[j];
    if (sum === 2020) {
      factors = [first, entries[j]];
      break;
    }
  }
}

console.log("1:", factors[0] * factors[1]);

for (let i = 0; i < entries.length; i++) {
  const first = entries[i];
  for (let j = i; j < entries.length; j++) {
    for (let k = j; k < entries.length; k++) {
      const sum = first + entries[j] + entries[k];
      if (sum === 2020) {
        factors = [first, entries[j], entries[k]];
        break;
      }
    }
  }
}

console.log("2:", factors[0] * factors[1] * factors[2]);
