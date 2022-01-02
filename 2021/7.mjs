import { readFile } from "./lib.mjs";

export function day7() {
  const positions = readFile("./inputs/7.txt")[0]
    .split(",")
    .map((num) => parseInt(num, 10));
  console.log("1:", leastFuel(positions));
  console.log("2:", leastFuelExp(positions));
}

export function leastFuelExp(positions) {
  let minFuel = 100000000;
  const maxPos = positions.reduce(function (a, b) {
    return Math.max(a, b);
  }, 0);

  let fuel = 0;
  for (let i = 0; i < maxPos; i++) {
    //console.log("pos", i);
    for (let pos of positions) {
      const posDiff = Math.abs(i - pos);
      fuel += findFuel(posDiff);
      //console.log("fuel", i, pos, fuel, findFuel(posDiff));
    }
    if (fuel < minFuel) {
      minFuel = fuel;
    }
    fuel = 0;
  }

  return minFuel;
}

function findFuel(steps) {
  let sum = 0;
  let start = 1;
  for (let i = 1; i <= steps; i++) {
    sum += start++;
  }
  return sum;
}

export function leastFuel(positions) {
  let minFuel = 100000000;
  const maxPos = positions.reduce(function (a, b) {
    return Math.max(a, b);
  }, 0);

  let fuel = 0;
  for (let i = 0; i < maxPos; i++) {
    for (let pos of positions) {
      if (i < pos) {
        fuel += pos - i;
      } else if (i > pos) {
        fuel += i - pos;
      }

      //console.log("fuel", pos, fuel);
    }
    if (fuel < minFuel) {
      minFuel = fuel;
    }
    fuel = 0;
  }

  return minFuel;
}
