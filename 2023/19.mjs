import { readFile, gridPrint } from "./lib.mjs";

const input = readFile("./input/19.txt");

const input2 = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`.split("\n");

export function day19() {
  let sum = 0;
  const [flows, parts] = parseInput(input2);

  //console.log(parts);

  for (const part of parts) {
    let decision = getDecision(part, flows["in"]);
    //console.log(decision);
    while (decision !== "R" && decision !== "A") {
      decision = getDecision(part, flows[decision]);
    }
    if (decision === "A") {
      sum += part.a + part.s + part.m + part.x;
    }
  }

  console.log("1:", sum);

  let done;
  let part = { x: 0, m: 0, a: 0, s: 0 };
  let decision = "";
  let sum2 = 0;

  while (!done) {
    [part, done] = generateNextPart(["x"]);
    console.log("new part", part, done);
    decision = getDecision(part, flows["in"]);

    while (decision !== "R" && decision !== "A") {
      decision = getDecision(part, flows[decision]);
      //console.log("dec", part, decision);
      if (decision === "A") {
        sum2++;
        break;
      }
    }
  }

  console.log("2:", sum2);
}

const seen = {};
let init = { x: 0, m: 0, a: 0, s: 0 };
function generateNextPart(prop) {
  let part = { ...init };

  for (const prop of props) {
    if (part[prop] >= 4000) {
      part[prop];
      break;
    }
  }

  const key = `${part.x}-${part.m}-${part.a}-${part.s}`;
  if (!seen[key]) {
    seen[key] = true;
    init = part;
    return [part, false];
  }
  return [part, true];
}

function getDecision(part, flow) {
  for (const [key, value] of flow.conds) {
    const test = key.replace(
      /(\w)([<>]).+/,
      (match, p1, p2, offset, string) => {
        return part[p1] + string.slice(1);
      },
    );
    if (eval(test)) {
      return value;
    }
  }
  return flow.dest;
}

function parseInput(input) {
  const flows = {};
  const parts = [];

  let isParts = false;
  for (const line of input) {
    if (line === "") {
      isParts = true;
      continue;
    }

    if (isParts) {
      parts.push(parsePart(line));
    } else {
      const [name, values] = parseFlow(line);
      flows[name] = values;
    }
  }

  return [flows, parts];
}

function parseFlow(line) {
  const name = line.substring(0, line.indexOf("{"));
  let conds = line
    .replaceAll("}", "")
    .substring(line.indexOf("{") + 1)
    .split(",");
  const dest = conds.pop();
  const newConds = [];
  for (let cond of conds) {
    if (cond.includes(":")) {
      const [key, value] = cond.split(":");
      newConds.push([key, value]);
    }
  }
  return [name, { dest, conds: newConds }];
}

function parsePart(line) {
  const parts = {};
  line
    .replaceAll("{", "")
    .replaceAll("}", "")
    .split(",")
    .map((part) => {
      const [key, value] = part.split("=");
      parts[key] = Number(value);
    });
  return parts;
}

function column(map, col) {
  return map.map((row) => row[col]);
}
