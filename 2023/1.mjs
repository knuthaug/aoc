import { readFile } from "./lib.mjs";

const rawInput = readFile("./input/1.txt");

const input = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
const extraInput = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];
export function day1() {
  let sum = 0;
  for (const line of rawInput) {
    const numbers = line.match(/\d/g);
    const value = numbers[0] + numbers[numbers.length - 1];
    sum += Number(value);
  }

  console.log(`1:${sum}`);

  let sum2 = 0;
  for (const line of rawInput) {
    const numbers = Array.from(
      line.matchAll(
        /(?=(\d|nine|eight|seven|six|five|three|four|three|two|one))/g,
      ),
    ).map((x) => x[1]);

    const value = lookup(numbers[0]) + lookup(numbers[numbers.length - 1]);
    sum2 += Number(value);
  }

  console.log(`2:${sum2}`);
}

function lookup(str) {
  const look = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  if (look[str]) {
    return look[str];
  }
  return str;
}
