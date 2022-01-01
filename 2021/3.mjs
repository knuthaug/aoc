import fs from "fs";
import { gt } from "./lib.mjs";
const lines = fs.readFileSync("3.txt").toString().trim().split("\n");

const test = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

let gammaBinary = [];
let epsilonBinary = [];

const bitLength = lines[0].length;
for (let bit = 0; bit < bitLength; bit++) {
  const bits = lines.map((num) => num.slice(bit, bit + 1));

  const occurrences = freq(bits);
  if (gt(occurrences["0"], occurrences["1"])) {
    gammaBinary.push(0);
    epsilonBinary.push(1);
  } else {
    gammaBinary.push(1);
    epsilonBinary.push(0);
  }
}

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
//onsole.log(remainCO2);
while (remainCO2.length > 1) {
  for (let bit = 0; bit < bitLength; bit++) {
    const bits = remainCO2.map((num) => num.slice(bit, bit + 1));
    const oc = freq(bits);
    //console.log(oc);
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

console.log("O2", remainO2, parseInt(remainO2.join(""), 2));
console.log("Co2", remainCO2, parseInt(remainCO2.join(""), 2));
console.log(
  "2: ",
  parseInt(remainO2.join(""), 2) * parseInt(remainCO2.join(""), 2)
);

function take(list, position, value) {
  return list.filter((el) => {
    const bit = parseInt(el.slice(position, position + 1), 10);
    //console.log(bit, value);
    return bit === value;
  });
}

function freq(list) {
  return list.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
}

const gamma = parseInt(gammaBinary.join(""), 2);
const epsilon = parseInt(epsilonBinary.join(""), 2);
console.log("1: ", gamma * epsilon);
