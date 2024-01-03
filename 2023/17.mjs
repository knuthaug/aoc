import { readFile, gridPrint } from "./lib.mjs";

const input = readFile("./input/17.txt");

const input2 = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`.split("\n");

export async function day17() {
  const grid = parseInput(input);
  let sum = 0;
  //gridPrint(grid);

  console.log("1:", findPath(grid, 0, 0, grid.length - 1, grid[0].length - 1));

  console.log(
    "2:",
    findPath(grid, 0, 0, grid.length - 1, grid[0].length - 1, true),
  );
}

/*{
	heatLoss: number,
	row: number,
	column: number,
	deltaRow: number,
	deltaColumn: number,
	steps: number,
}*/

export function findPath(grid, y, x, targetY, targetX, ultra = false) {
  const queue = [{ heatloss: 0, y, x, deltaY: 0, deltaX: 0, steps: 0 }];
  const seen = new Set();
  const nexts = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const cur = queue
      .sort((prevCost, nextCost) => nextCost.heatloss - prevCost.heatloss)
      .pop();

    if (
      cur.y === targetY &&
      cur.x === targetX &&
      (ultra ? cur.steps >= 4 : true)
    ) {
      return cur.heatloss;
    }

    const key = JSON.stringify({
      y: cur.y,
      x: cur.x,
      dy: cur.deltaY,
      dx: cur.deltaX,
      steps: cur.steps,
    });
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);

    if (
      cur.steps < (ultra ? 10 : 3) &&
      ![cur.deltaY, cur.deltaX].every((coord) => coord === 0)
    ) {
      const nextY = cur.y + cur.deltaY;
      const nextX = cur.x + cur.deltaX;

      if (
        0 <= nextY &&
        nextY < grid.length &&
        0 <= nextX &&
        nextX < grid[0].length
      ) {
        queue.push({
          heatloss: cur.heatloss + grid[nextY][nextX],
          y: nextY,
          x: nextX,
          deltaY: cur.deltaY,
          deltaX: cur.deltaX,
          steps: cur.steps + 1,
        });
      }
    }

    if (
      ultra ? cur.steps >= 4 || equals([cur.deltaY, cur.deltaX], [0, 0]) : true
    ) {
      for (const [nextDeltaY, nextDeltaX] of nexts) {
        if (
          `${nextDeltaY} ${nextDeltaX}` !== `${cur.deltaY} ${cur.deltaX}` &&
          `${nextDeltaY} ${nextDeltaX}` !== `${-cur.deltaY} ${-cur.deltaX}`
        ) {
          const nextY = cur.y + nextDeltaY;
          const nextX = cur.x + nextDeltaX;

          if (
            0 <= nextY &&
            nextY < grid.length &&
            0 <= nextX &&
            nextX < grid[0].length
          ) {
            queue.push({
              heatloss: cur.heatloss + grid[nextY][nextX],
              y: nextY,
              x: nextX,
              deltaY: nextDeltaY,
              deltaX: nextDeltaX,
              steps: 1,
            });
          }
        }
      }
    }
  }
  return 0;
}

export function equals(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function parseInput(input) {
  const map = input.map((line) => {
    return line.split("").map((a) => Number(a));
  });

  return map;
}

function column(map, col) {
  return map.map((row) => row[col]);
}
