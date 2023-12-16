import { readFile, gridPrint } from "./lib.mjs";

const input = readFile("./input/16.txt");

const input2 = `.|...@....
|.-.@.....
.....|-...
........|.
..........
.........@
..../.@@..
.-.-/..|..
.|....-|.@
..//.|....`.split("\n");

const length = input.length;

export async function day16() {
  const grid = parseInput(input);
  console.log("grid", grid.length, grid[0].length);
  //gridPrint(grid);
  //console.log(grid[78][111]);
  //gridPrint(energized);

  console.log("1:", followBeam(grid));

  const entryPoints = [];
  for (let i = 0; i < grid.length; i++) {
    entryPoints.push(["r", i, 0]);
    entryPoints.push(["l", i, grid.length - 1]);
  }
  for (let i = 0; i < grid[0].length; i++) {
    entryPoints.push(["d", 0, i]);
    entryPoints.push(["u", grid[0].length - 1, i]);
  }
  console.log(
    "2:",
    entryPoints
      .map((entry) => followBeam(grid, [entry]))
      .reduce((a, x) => Math.max(a, x), 0),
  );
}

function sumEnergized(energized) {
  return energized
    .flatMap((row) => row)
    .reduce((acc, el) => {
      if (el === "#") return acc + 1;
      return acc;
    }, 0);
}

function followBeam(grid, stack = [["r", 0, 0]]) {
  const visited = {};
  const energized = new Array(length);
  for (let i = 0; i < grid[0].length; i++) {
    energized[i] = new Array(length).fill(".");
  }

  console.log("stack", stack);

  while (stack.length > 0) {
    const [dir, y, x] = stack.pop();
    if (visited[`${dir} ${y} ${x}`]) {
      continue;
    }

    if (!grid[y]?.[x]) {
      continue;
    }

    energized[y][x] = "#";
    visited[`${dir} ${y} ${x}`] = true;
    const newDir = newDirection(grid, y, x, dir);
    newDir.forEach((dir) => {
      let newPos = { y: 0, x: 0 };
      if (dir === "r") {
        newPos = { y: y, x: x + 1 };
      } else if (dir === "d") {
        newPos = { y: y + 1, x: x };
      } else if (dir === "l") {
        newPos = { y: y, x: x - 1 };
      } else if (dir === "u") {
        newPos = { y: y - 1, x: x };
      }
      stack.push([dir, newPos.y, newPos.x]);
    });
  }
  return sumEnergized(energized);
}

function newDirection(grid, y, x, direction) {
  if (grid[y][x] === ".") {
    return [direction];
  }

  if (grid[y][x] === "/") {
    if (direction === "r") {
      return ["u"];
    } else if (direction === "l") {
      return ["d"];
    } else if (direction === "u") {
      return ["r"];
    } else {
      return ["l"];
    }
  } else if (grid[y][x] === "@") {
    if (direction === "r") {
      return ["d"];
    } else if (direction === "l") {
      return ["u"];
    } else if (direction === "u") {
      return ["l"];
    } else {
      return ["r"];
    }
  } else if (grid[y][x] === "|") {
    if (direction === "r") {
      return ["d", "u"];
    } else if (direction === "l") {
      return ["d", "u"];
    }
    return [direction];
  } else if (grid[y][x] === "-") {
    if (direction === "u") {
      return ["l", "r"];
    } else if (direction === "d") {
      return ["l", "r"];
    }
    return [direction];
  }
  console.log("foo", y, x, grid[y][x], direction);
}

function parseInput(input) {
  const map = input.map((line) => {
    return line.split("");
  });

  return map;
}

function column(map, col) {
  return map.map((row) => row[col]);
}
