import { readFile, gridPrint } from "./lib.mjs";

const input = parseInput(readFile("./input/15.txt"));

const input2 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`.split(",");

const newMap = [];
export async function day15() {
  let sum = 0;

  sum = input.map((a) => hash(a)).reduce((a, b) => a + b, 0);
  console.log("1:", sum);

  const boxes = new Array(256).fill().map(() => ({}));

  input
    .map((x) => {
      const m = x.match(/([a-z]+)(.)([0-9])?/);
      return [m[1], m[2], m[3] ? Number(m[3]) : null];
    })
    .forEach(([label, oper, len]) => {
      if (oper === "=") {
        boxes[hash(label)][label] = len;
      } else if (oper === "-") {
        delete boxes[hash(label)][label];
      }
    });

  console.log(
    "2:",
    boxes.reduce(
      (sum, box, i) =>
        sum +
        Object.values(box).reduce((s, v, j) => (s += (i + 1) * (j + 1) * v), 0),
      0,
    ),
  );
}

function hash(str) {
  let value = 0;
  for (const char of str) {
    value += char.charCodeAt(0);
    value *= 17;
    value = value % 256;
  }
  return value;
}

function parseInput(input) {
  return input.join("").split(",");
}

function column(map, col) {
  return map.map((row) => row[col]);
}
