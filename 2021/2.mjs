import { readFile } from "./lib.mjs";

const lines = readFile("./inputs/2.txt").map((line) => {
  const l = line.split(" ");
  return [l[0], parseInt(l[1], 10)];
});

export function day2() {
  const results = day2Calculations(lines);
  console.log(
    `1: position=${results["1"].pos}, depth=${results["1"].depth}, sum=${
      results["1"].pos * results["1"].depth
    }`
  );
  console.log(
    `2: position=${results["2"].pos}, depth=${results["2"].depth}, sum=${
      results["2"].pos * results["2"].depth
    }`
  );
}

export function day2Calculations(lines) {
  const values = { 1: {}, 2: {} };
  let pos = 0;
  let depth = 0;
  let complexDepth = 0;
  let aim = 0;

  for (let i = 0; i < lines.length; i++) {
    const cmd = lines[i];
    if (cmd[0] === "forward") {
      pos += cmd[1];
      complexDepth += aim * cmd[1];
    }
    if (cmd[0] === "up") {
      depth -= cmd[1];
      aim -= cmd[1];
    }

    if (cmd[0] === "down") {
      depth += cmd[1];
      aim += cmd[1];
    }
  }
  values[1] = { pos, depth };
  values[2] = { pos, depth: complexDepth };

  return values;
}
