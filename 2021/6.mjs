import { readFile } from "./lib.mjs";

export function day6() {
  const lines = readFile("./inputs/6.txt");
  const values = lines[0].split(",").map((num) => parseInt(num, 10));
  //console.log(values);
  const result = day6Calculations(values);
  console.log("1:", result[1]);
  console.log("2:", result[2]);
}

export function day6Calculations(fish) {
  const count = days(fish, 80).length;
  const countLarge = daysLarge(fish, 256);
  return { 1: count, 2: countLarge };
}

export function daysLarge(fish, numberOfDays) {
  const days = Array(9).fill(0);
  for (let day of fish) {
    days[day]++;
  }

  for (let i = 0; i < 256; i++) {
    let sixFish = 0;
    let eightFish = 0;
    for (let day = 0; day < days.length; day++) {
      let count = days[day];
      if (day === 0) {
        sixFish = count;
        eightFish = count;
      } else {
        days[day - 1] = count;
      }
    }

    days[6] += sixFish;

    // Set the fish at age 8 to the number of fish that were spawned (don't add, because we don't "shift" in a 0 for day 8's slot)
    days[8] = eightFish;
  }

  return days.reduce((a, b) => a + b);
}

export function days(fish, numberOfDays) {
  let school = [...fish];
  for (let i = 1; i <= numberOfDays; i++) {
    school = update(school);
  }
  return school;
}

function update(school) {
  const newSchool = [...school];
  for (let i = 0; i < school.length; i++) {
    if (school[i] > 0) {
      newSchool[i]--;
    }
    if (school[i] === 0) {
      newSchool[i] = 6;
      newSchool.push(8);
    }
  }
  return newSchool;
}
