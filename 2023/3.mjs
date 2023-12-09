import { readFile } from "./lib.mjs";
const input = readFile("./input/3.txt");

const input2 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split("\n");

export async function day3() {
  // part 2
  let sum23 = 0;
  console.log(sum23);
}

function check(grid, row, cell, length) {
  for (let i = 0; i < length; i++) {
    const around =
      cellAt(grid, row, cell - i + 1) +
      cellAt(grid, row + 1, cell - i + 1) +
      cellAt(grid, row + 1, cell - i) +
      cellAt(grid, row + 1, cell - i - 1) +
      cellAt(grid, row, cell - i - 1) +
      cellAt(grid, row - 1, cell - i - 1) +
      cellAt(grid, row - 1, cell - i) +
      cellAt(grid, row - 1, cell - i + 1);

    if (around.match(/[^0-9.]/)) {
      return true;
    }
  }
  return false;
}

function cellAt(grid, row, cell) {
  if (row >= 0 && row < grid.length && cell >= 0 && cell < grid[row].length) {
    return grid[row][cell];
  }
  return ".";
}
