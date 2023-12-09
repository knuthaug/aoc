import { readFile } from "./lib.mjs";

const input = readFile("./input/9.txt");

const input2 = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`.split("\n");

export async function day9() {
  let sum = 0;
  let sum2 = 0;

  const values = parseInput(input);

  for (const value of values) {
    const lasts = [];
    const firsts = [];

    let row = value;
    lasts.push(row[row.length - 1]);
    firsts.push(row[0]);

    while (!allZeroes(row)) {
      const nextrow = [];
      for (let i = 0; i < row.length; i++) {
        if (i + 1 === row.length) {
          break;
        }
        nextrow.push(row[i + 1] - row[i]);
      }
      row = nextrow;
      lasts.push(row[row.length - 1]);
      firsts.push(row[0]);
    }
    sum += lasts.reduce((a, b) => a + b, 0);
    const newfirsts = newFirsts(firsts);
    sum2 += newfirsts[newfirsts.length - 1];
  }

  console.log("1: ", sum);
  console.log("2: ", sum2);
}

function newFirsts(arr) {
  const newarr = [0];
  let target = arr[arr.length - 1];
  for (let i = arr.length - 2; i >= 0; i--) {
    if (newarr.length === 1) {
      newarr.push(arr[i]);
      target = arr[i - 1];
      continue;
    }
    newarr.push(target + -newarr[newarr.length - 1]);
    target = arr[i - 1];
  }
  return newarr;
}

function allZeroes(arr) {
  return arr.every((el) => el === 0);
}

function parseInput(input) {
  return input.map((line) => {
    return line.split(" ").map(Number);
  });
}
