import { readFile } from "./lib.mjs";

const input = readFile("./input/11.txt");

const input2 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.split("\n");

const newMap = [];
export async function day11() {
  let sum2 = 0;

  const map = parseInput(input2, 1);

  let galaxy = 1;
  const numberedMap = map.map((row) =>
    row.map((c) => (c === "#" ? galaxy++ : ".")),
  );

  console.log(`map size:${map.length}x${map[0].length}`);

  const galaxies = [];
  let count = 1;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        galaxies.push({
          count,
          y,
          x,
        });
        count++;
      }
    }
  }

  const distances = findDistances(galaxies);

  console.log(
    "1: ",
    distances.reduce((a, b) => a + b, 0),
  );

  parseInput(input2, 1000 - 1);
  console.log(`map size:${newMap.length}x${newMap[0].length}`);
  //console.log(map2.map((a) => a.join(" ")).join("\n"));
  const galaxies2 = [];
  let count2 = 1;
  for (let y = 0; y < newMap.length; y++) {
    for (let x = 0; x < newMap[0].length; x++) {
      if (newMap[y][x] === "#") {
        galaxies2.push({
          count: count2,
          y,
          x,
        });
        count2++;
      }
    }
  }

  const distances2 = findDistances(galaxies2);
  console.log(
    "2: ",
    distances2.reduce((a, b) => a + b, 0),
  );
}

function distanceBetween(a, b) {
  return Math.abs(a.y - b.y) + Math.abs(a.x - b.x);
}

function findDistances(universes) {
  const total = universes.length;
  const distances = {};
  for (let i = 0; i < total; i++) {
    for (let j = 0; j < total; j++) {
      if (i === j) {
        continue;
      }

      const a = universes[i];
      const b = universes[j];
      const key = `(${[a.count, b.count].sort().join(",")})`;
      if (distances[key]) {
        continue;
      }

      distances[key] = distanceBetween(a, b);
    }
  }
  return Object.values(distances);
}

function parseInput(input, pad) {
  const map = input.map((line) => {
    return line.split("");
  });

  for (let y = 0; y < map.length; y++) {
    newMap.push(map[y]);
    if (map[y].every((c) => c === ".")) {
      for (let i = 0; i < pad; i++) {
        newMap.push(map[y]);
      }
    }
  }

  let index = 0;
  for (let x = 0; x < map[0].length; x++) {
    const col = column(map, x);
    if (col.every((c) => c === ".")) {
      const newSection = [];
      for (let i = 0; i < pad; i++) {
        newSection.push(".");
      }

      for (let y = 0; y < newMap.length; y++) {
        //console.log("newmap-b", newMap[y]);
        newMap[y] = newMap[y].toSpliced(x + index, 0, ...newSection);
        //console.log("newmap-a", newMap[y]);
      }
      index += pad;
    }
  }
  return newMap;
}

function column(map, col) {
  return map.map((row) => row[col]);
}
