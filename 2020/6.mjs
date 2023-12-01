import { input } from "./input.mjs";

const lines = input("./6.txt");
console.log("1:", sumOfAll(lines));

export function sum(list) {
  const seen = [];
  for (const l of list) {
    const chars = l.split("");
    for (const c of chars) {
      if (!seen.find((e) => e === c)) {
        seen.push(c);
      }
    }
  }
  return seen.length;
}

export function sumOfAll(lines) {
  let q = [];
  let sumQ = 0;
  let sumAll = 0;
  for (const line of lines) {
    // skip on blank
    if (line === "") {
      sumQ += sum(q);
      sumAll += sumOfAllYes(q);
      q = [];
    } else {
      q.push(line);
    }
  }

  return [sumQ + sum(q), sumAll + sumOfAllYes(q)];
}

export function sumOfAllYes(list) {
  const people = list.length;
  const seen = {};
  for (const l of list) {
    const chars = l.split("");
    for (const c of chars) {
      if (!seen[c]) {
        seen[c] = 1;
      } else {
        seen[c] = seen[c] + 1;
      }
    }
  }
  return Object.keys(seen).filter((p) => seen[p] === people).length;
}
