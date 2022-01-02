import fs from "fs";
import { gt, take, freq } from "./lib.mjs";
const lines = fs.readFileSync("./inputs/3.txt").toString().trim().split("\n");

export function day3() {
  const values = day3Calculations(lines);
  console.log("1: ", values[1]);
  console.log("2: ", values[2]);
}

export function day3Calculations(lines) {
  const values = {};
  let gammaBinary = [];
  let epsilonBinary = [];

  const bitLength = lines[0].length;
  for (let bit = 0; bit < bitLength; bit++) {
    const bits = lines.map((num) => num.slice(bit, bit + 1));

    const oc = freq(bits);
    if (gt(oc["0"], oc["1"])) {
      gammaBinary.push(0);
      epsilonBinary.push(1);
    } else {
      gammaBinary.push(1);
      epsilonBinary.push(0);
    }
  }

  const gamma = parseInt(gammaBinary.join(""), 2);
  const epsilon = parseInt(epsilonBinary.join(""), 2);
  values[1] = gamma * epsilon;

  // part deux
  let remainO2 = lines;

  while (remainO2.length > 1) {
    for (let bit = 0; bit < bitLength; bit++) {
      const bits = remainO2.map((num) => num.slice(bit, bit + 1));
      const oc = freq(bits);
      if (gt(oc["0"], oc["1"])) {
        remainO2 = take(remainO2, bit, 0);
      } else {
        remainO2 = take(remainO2, bit, 1);
      }
      if (remainO2.length === 1) {
        break;
      }
    }
  }

  let remainCO2 = lines;

  while (remainCO2.length > 1) {
    for (let bit = 0; bit < bitLength; bit++) {
      const bits = remainCO2.map((num) => num.slice(bit, bit + 1));
      const oc = freq(bits);
      if (gt(oc["1"], oc["0"]) || oc["0"] === oc["1"]) {
        remainCO2 = take(remainCO2, bit, 0);
      } else {
        remainCO2 = take(remainCO2, bit, 1);
      }
      if (remainCO2.length === 1) {
        break;
      }
    }
  }

  values[2] = parseInt(remainO2.join(""), 2) * parseInt(remainCO2.join(""), 2);

  return values;
}
