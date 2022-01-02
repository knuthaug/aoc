import { readFile } from "./lib.mjs";

export function day5() {
  const lines = readFile("./inputs/5.txt");
  const values = day5Calculations(lines);
  console.log("1:", values[1]);
  console.log("2:", values[2]);
}

export function day5Calculations(input) {
  const grid = fill(input);
  let count = 0;
  for (let row of grid) {
    for (let point of row) {
      if (point >= 2) {
        count++;
      }
    }
  }
  return { 1: count, 2: 42 };
}

export function fill(input) {
  let maxX = 0;
  let maxY = 0;
  const lines = [];

  for (let inputLine of input) {
    const pairs = inputLine
      .split(" -> ")
      .map((p) => p.split(",").map((num) => parseInt(num), 10));
    const [x1, y1] = pairs[0];
    const [x2, y2] = pairs[1];
    let line = buildLine(x1, y1, x2, y2);
    if (line.length === 0) {
      line = buildLineDiagonal(x1, y1, x2, y2);
    }
    lines.push(line);
    for (let point of line) {
      if (point[0] > maxX) {
        maxX = point[0];
      }
      if (point[1] > maxY) {
        maxY = point[1];
      }
    }
    //console.log(`${x1},${y1} -> ${x2},${y2}`, line);
  }

  const gridLine = Array(maxY + 1).fill(0);
  const grid = Array(maxY + 1);

  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(maxX + 1).fill(0);
  }
  //console.log(grid);
  for (let line of lines) {
    for (let point of line) {
      const [x, y] = [point[0], point[1]];
      grid[y][x]++;
    }
  }
  return grid;
}

export function buildLine(x1, y1, x2, y2) {
  const values = [];
  if (y1 === y2) {
    if (x1 > x2) {
      for (let i = x1; i >= x2; i--) {
        values.push([i, y1]);
      }
    } else {
      for (let i = x1; i <= x2; i++) {
        values.push([i, y1]);
      }
    }
  } else if (x1 === x2) {
    if (y1 > y2) {
      for (let i = y1; i >= y2; i--) {
        values.push([x1, i]);
      }
    } else {
      for (let i = y1; i <= y2; i++) {
        values.push([x1, i]);
      }
    }
  }
  return values;
}

export function buildLineDiagonal(x1, y1, x2, y2) {
  const values = [];
  if (x1 < x2) {
    if (y1 > y2) {
      for (let i = x1; i <= x2; i++) {
        values.push([i, y1--]);
      }
    } else {
      for (let i = x1; i <= x2; i++) {
        values.push([i, i]);
      }
    }
  } else if (x1 >= x2) {
    if (y1 > y2) {
      for (let i = x1; i >= x2; i--) {
        values.push([i, y1--]);
      }
    } else {
      for (let i = x1; i >= x2; i--) {
        values.push([i, y1++]);
      }
    }
  }
  return values;
}
