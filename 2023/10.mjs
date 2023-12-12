import { readFile } from "./lib.mjs";

const input = readFile("./input/10.txt");

const input2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`.split("\n");

const possibles = {
  N: ["|", "L", "J", "7", "F"],
  E: ["-", "L", "F", "J", "7"],
  S: ["|", "F", "7", "L", "J"],
  W: ["-", "J", "7", "L", "F"],
};

const opposites = { N: "S", E: "W", S: "N", W: "E" };

const allDirections = ["N", "E", "S", "W"];

export async function day10() {
  let sum = 0;
  let sum2 = 0;

  const map = parseInput(input2);
  console.log(map);

  const start = findStart(map);
  console.log(start);
  const paths = followLoop(map, start);
  console.log(paths);

  console.log("1: ", sum);
  console.log("2: ", sum2);
}

function followLoop(map, start) {
  const all = goDirections(map, start, allDirections);
  const paths = [[], []];
  let i = 0;
  for (const dir of Object.keys(all)) {
    if (possibles[dir].includes(all[dir])) {
      // start along loop
      console.log("start along loop", dir, all[dir], i);
      paths[i++].push(0);
      //console.log(dir, all[dir]);
      let current = all[dir];
      let currentPos = posForDirection(start, dir);
      console.log("currentPos", currentPos);
      while (current !== "S") {
        let next = goDirections(
          map,
          currentPos,
          allDirections.filter((d) => opposites[dir] !== d),
        );
        console.log("next", next);
        for (const nextDir of Object.keys(next)) {
          if (possibles[nextDir].includes(next[nextDir])) {
            const nextPos = posForDirection(currentPos, nextDir);
            next = goDirection(
              map,
              nextPos,
              allDirections.filter((d) => opposites[nextDir] !== d),
            );
            console.log("next2", nextDir, next, i, nextPos);
          }
        }

        paths[i].push(next);
        current = next;
      }
    }
  }

  return paths;
}

function posForDirection(pos, direction) {
  const [x, y] = pos;
  if (direction === "N") {
    return [x, y - 1];
  } else if (direction === "E") {
    return [x + 1, y];
  } else if (direction === "S") {
    return [x, y + 1];
  } else if (direction === "W") {
    return [x - 1, y];
  }
}

function goDirections(map, pos, directions) {
  const all = {};
  for (const dir of directions) {
    all[dir] = goDirection(map, pos, dir);
  }
  return all;
}

function goDirection(map, pos, direction) {
  const [x, y] = pos;
  if (direction === "N" && map[y - 1][x]) {
    return check(map, y - 1, x);
  } else if (direction === "E" && map[y][x + 1]) {
    return check(map, y, x + 1);
  } else if (direction === "S" && map[y + 1][x]) {
    return check(map, y + 1, x);
  } else if (direction === "W" && map[y][x - 1]) {
    return check(map, y, x - 1);
  }
  return ".";
}

function check(map, y, x) {
  if (x < 0 || x > map[y].length) {
    return ".";
  }
  if (y < 0 || y > map.length) {
    return ".";
  }
  return map[y][x];
}

function findStart(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        return [x, y];
      }
    }
  }
}

function parseInput(input) {
  return input.map((line) => {
    return line.split("");
  });
}
