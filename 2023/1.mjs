import { readFile, parseFile } from "./lib.mjs";

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

class CalibrationParser {
  parse(line) {
    const numbers = line.match(/\d/g);
    return Number(numbers[0] + numbers[numbers.length - 1]);
  }
}

class AdvancedCalibrationParser {
  parse(line) {
    const numbers = Array.from(
      line.matchAll(
        /(?=(\d|nine|eight|seven|six|five|three|four|three|two|one))/g,
      ),
    ).map((x) => x[1]);

    return Number(lookup(numbers[0]) + lookup(numbers[numbers.length - 1]));
  }
}

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
  const sum = parseFile("./input/1.txt", new CalibrationParser()).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  console.log(`1:${sum}`);

  const sum2 = parseFile(
    "./input/1.txt",
    new AdvancedCalibrationParser(),
  ).reduce((acc, curr) => acc + curr, 0);
  console.log(`2:${sum2}`);
}
