import { input } from "./input.mjs";

class Grid {
  grid = [];

  constructor(lines) {
    for (const line of lines) {
      this.grid.push(
        line.split("").map((v) => {
          if (v === ".") {
            return 0;
          } else {
            return 1;
          }
        })
      );
    }
  }

  path(x, y) {
    let currentX = 0;
    let currentY = 0;

    let trees = 0;
    while (currentY != this.grid.length) {
      if (this.point(currentY, currentX) === 1) {
        trees++;
      }
      // move current
      currentX += x;
      currentY += y;
      if (currentY > this.grid.length) {
        break;
      }
    }
    return trees;
  }

  point(y, x) {
    if (x >= this.grid[y].length) {
      x = this.coerce(x, this.grid[y].length);
    }
    return this.grid[y][x];
  }

  coerce(value, amount) {
    while (value >= amount) {
      value -= amount;
    }
    return value;
  }
}

export function day3(lines) {
  return new Grid(lines);
}

const lines = input("3.txt");
const grid = new Grid(lines);
console.log("1:", grid.path(3, 1));

console.log(
  "2:",
  grid.path(1, 1) *
    grid.path(3, 1) *
    grid.path(5, 1) *
    grid.path(7, 1) *
    grid.path(1, 2)
);
