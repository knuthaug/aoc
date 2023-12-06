import { readFile } from "./lib.mjs";
const input = readFile("./input/6.txt");

const input2 = `Time:      7  15   30
Distance:  9  40  200`.split("\n");

export async function day6() {
  let sum = 0;
  const [times, distances] = parseInput(input);

  for (let i = 0; i < times.length; i++) {
    let numberOfWins = 0;
    const time = times[i];
    const distance = distances[i];

    for (let j = 0; j < time; j++) {
      const speed = j;
      const travelledDistance = speed * (time - j);
      if (travelledDistance > distance) {
        numberOfWins++;
      }
    }
    sum = sum === 0 ? numberOfWins : sum * numberOfWins;
  }

  console.log("1: ", sum);

  let sum2 = 0;
  const [time, distance] = parseInput2(input);

  for (let j = 0; j < time; j++) {
    const speed = j;
    const travelledDistance = speed * (time - j);
    if (travelledDistance > distance) {
      sum2++;
    }
  }

  console.log("2: ", sum2);
}

function parseInput(input) {
  return [mapNumbers(input[0]), mapNumbers(input[1])];
}

function parseInput2(input) {
  const time = Number(input[0].split(":")[1].trim().replace(/\s+/g, ""));
  const distance = Number(input[1].split(":")[1].trim().replace(/\s+/g, ""));
  return [time, distance];
}

function mapNumbers(line) {
  return line
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map((x) => Number(x.trim()));
}
