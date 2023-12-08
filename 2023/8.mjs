import { readFile } from "./lib.mjs";
import pkg from "compute-lcm";
const lcm = pkg;

const input = readFile("./input/8.txt");

const input2 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`.split("\n");

const input3 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`.split("\n");

const input4 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`.split("\n");

export async function day8() {
  let sum = 0;

  const [instructions, steps] = parseInput(input);

  const start = "AAA";
  const end = "ZZZ";

  let current = steps[start];
  for (let i = 0; i < instructions.length; i++) {
    const ins = instructions[i];
    const next = ins === "R" ? current.right : current.left;
    //console.log(`${i} ${ins} -> ${next}`);
    current = steps[next];
    sum += 1;
    if (next === end) {
      break;
    }

    if (i === instructions.length - 1) {
      i = -1;
    }
  }
  console.log("1: ", sum);

  const [instructions2, steps2] = parseInput(input);
  const starts = Object.keys(steps2).filter((ins) => {
    return ins.match(/A$/);
  });

  let instruction = 0;
  let stepCount = 0;

  const allSteps = [];
  for (let current of starts) {
    stepCount = 0;
    instruction = 0;
    while (!current.match(/Z$/)) {
      current =
        steps2[current][instructions2[instruction] === "L" ? "left" : "right"];
      instruction =
        instruction + 1 === instructions2.length ? 0 : instruction + 1;
      stepCount += 1;
    }
    allSteps.push(stepCount);
  }

  console.log("2: ", lcm(allSteps));
}

function parseInput(input) {
  const instructions = input[0].trim().split("");
  const steps = {};
  for (const line of input.slice(1)) {
    const parts = line.match(/(\w+) = \((\w+), (\w+)\)/);
    if (parts) {
      steps[parts[1]] = {
        left: parts[2],
        right: parts[3],
      };
    }
  }
  return [instructions, steps];
}
