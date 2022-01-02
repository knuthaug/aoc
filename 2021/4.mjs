import { readFile } from "./lib.mjs";

export function day4() {
  const lines = readFile("./inputs/4.txt");
  //const lines = readFile("./test/day4test.txt");
  const values = day4Calculations(lines);
  console.log("1:", values[1]);
  console.log("2:", values[2]);
}

export function day4Calculations(lines) {
  const values = parse(lines);
  const result = {};

  for (let number of values.draw) {
    const value = draw(number, values.boards);
    if (value !== 0) {
      if (!result[1]) {
        result[1] = value;
      } else if (values.boards.length === 0) {
        result[2] = value;
        break;
      }
    }
  }
  return result;
}

function draw(number, boards) {
  const [indexes, board] = mark(number, boards);
  if (board) {
    const sumOfBoard = sumBoard(board, number);

    const removeValFromIndex = indexes.sort(function (a, b) {
      return a - b;
    });
    for (let i = removeValFromIndex.length - 1; i >= 0; i--) {
      boards.splice(removeValFromIndex[i], 1);
    }

    return sumOfBoard;
  }
  return 0;
}

function sumBoard(board, number) {
  let sum = 0;
  for (let row of board) {
    for (let num of row) {
      if (typeof num === "number") {
        sum += num;
      }
    }
  }
  return sum * number;
}

function mark(number, boards) {
  let returnValues = [[], []];
  for (let i = 0; i < boards.length; i++) {
    for (let row of boards[i]) {
      for (let [j, num] of row.entries()) {
        if (typeof num === "number" && num === number) {
          row[j] = `${num}`;
          const col = sliceColumn(boards[i], j);
          if (allMarked(row) || allMarked(col)) {
            returnValues[0].push(i);
            returnValues[1] = boards[i];
          }
        }
      }
    }
  }
  return returnValues;
}

function sliceColumn(board, index) {
  const col = [];
  for (let i = 0; i < board.length; i++) {
    col.push(board[i][index]);
  }
  return col;
}

function allMarked(row) {
  return row.every((el) => typeof el === "string");
}

export function parse(lines) {
  const boards = [];
  let board = [];
  for (let i = 2; i < lines.length; i++) {
    if (lines[i] === "" || i === lines.length - 1) {
      if (i === lines.length - 1) {
        board.push(parseBoardLine(lines[i]));
      }
      boards.push([...board]);
      board = [];
      continue;
    }

    board.push(parseBoardLine(lines[i]));
  }

  function parseBoardLine(line) {
    return line
      .replaceAll("  ", " ")
      .trim()
      .split(" ")
      .map((num) => parseInt(num.trim()), 10);
  }

  //console.log(boards);
  return {
    boards,
    draw: lines[0].split(",").map((num) => parseInt(num, 10)),
  };
}
