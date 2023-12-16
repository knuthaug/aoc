import { readFile, gridPrint } from "./lib.mjs";

const input = readFile("./input/14.txt");

const input2 = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.split("\n");

const newMap = [];
export async function day14() {
  let sum = 0;

  let map = parseInput(input);
  map = tilt(map, "N");
  sum = mapSum(map);

  console.log("1:", sum);

  let sum2 = 0;
  map = parseInput(input);
  const seen = [];
  //console.log(toString(map));
  seen.push(toString(map));

  for (let i = 0; i < 92; i++) {
    map = tilt(map, "N");
    map = tilt(map, "W");
    map = tilt(map, "S");
    map = tilt(map, "E");
    //console.log("cycle", i, mapSum(map));
    //console.log(toString(map));

    seen.push(toString(map));
  }

  for (let x = 0; x < map[0].length; x++) {
    let colSum = 0;
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === "O") {
        colSum += map[y].length - y;
      }
    }
    sum2 += colSum;
  }

  console.log("2:", sum2);
}

function mapSum(map) {
  let sum = 0;
  for (let x = 0; x < map[0].length; x++) {
    let colSum = 0;
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === "O") {
        colSum += map[y].length - y;
      }
    }
    sum += colSum;
  }
  return sum;
}

function toString(grid) {
  let str = "";
  for (let y = 0; y < grid.length; y++) {
    str += grid[y].join("");
  }
  return str;
}

function equal(grid, grid2) {
  for (let y = 0; y < grid.length; y++) {
    if (grid[y].join("") !== grid2[y].join("")) {
      return false;
    }
  }
  return true;
}

function tilt(map, direction) {
  const cols = map[0].length;
  const rows = map.length;
  //move north
  if (direction === "N") {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (map[y][x] === ".") {
          if (y + 1 < rows && map[y + 1][x] === "O") {
            map[y][x] = "O";
            map[y + 1][x] = ".";
            y = -1;
          }
        }
      }
    }
  } else if (direction === "S") {
    for (let x = 0; x < cols; x++) {
      for (let y = rows - 1; y >= 0; y--) {
        if (map[y][x] === ".") {
          if (y - 1 >= 0 && map[y - 1][x] === "O") {
            map[y][x] = "O";
            map[y - 1][x] = ".";
            y = rows;
          }
        }
      }
    }
  } else if (direction === "W") {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (map[y][x] === ".") {
          if (x + 1 < cols && map[y][x + 1] === "O") {
            map[y][x] = "O";
            map[y][x + 1] = ".";
            x = -1;
          }
        }
      }
    }
  } else if (direction === "E") {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (map[y][x] === ".") {
          if (x - 1 < cols && map[y][x - 1] === "O") {
            map[y][x] = "O";
            map[y][x - 1] = ".";
            x = -1;
          }
        }
      }
    }
  }

  return map;
}

function parseInput(input, pad) {
  const map = input.map((line) => {
    return line.split("");
  });

  return map;
}

function column(map, col) {
  return map.map((row) => row[col]);
}
