import { readFile } from "./lib.mjs";
import { part1, part2 } from "./test.mjs";
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
  const sum1 = await part1(input);
  console.log(sum1);
  let sum = 0;
  const grid = input.map((line) => line.split(""));
  //console.log(grid);
  for (let row = 0; row < grid.length; row++) {
    let number = "";
    for (let cell = 0; cell < grid[row].length; cell++) {
      if (grid[row][cell].match(/[0-9]/)) {
        number += grid[row][cell];
      } else if (
        grid[row][cell] === "." ||
        !grid[row][cell].match(/[0-9]/) ||
        cell === grid[row].length - 1 // end of lines
      ) {
        const len = number.length;
        if (len > 0) {
          if (check(grid, row, cell - 1, len)) {
            //console.log(`Found ${number} is good`);
            sum += Number(number);
          }

          number = "";
        }
      }
    }
  }
  console.log(sum);

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
