import { expect } from "chai";
import { day2Calculations } from "../2.mjs";
import { day3Calculations } from "../3.mjs";
import { day4Calculations, parse } from "../4.mjs";
import { fill, day5Calculations, buildLine, buildLineDiagonal } from "../5.mjs";
import { days, daysLarge } from "../6.mjs";
import { leastFuel, leastFuelExp } from "../7.mjs";
import { readFile } from "../lib.mjs";

describe("day 2", async () => {
  describe("calculations", () => {
    const test = [
      ["forward", 5],
      ["down", 5],
      ["forward", 8],
      ["up", 3],
      ["down", 8],
      ["forward", 2],
    ];

    it("should process test input", () => {
      const values = day2Calculations(test);
      expect(values[1].pos).to.equal(15);
      expect(values[1].depth).to.equal(10);
      expect(values[2].pos).to.equal(15);
      expect(values[2].depth).to.equal(60);
    });
  });
});

describe("day 3", async () => {
  describe("calculations", () => {
    const test = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];

    it("should process test input", () => {
      const values = day3Calculations(test);
      expect(values[1]).to.equal(198);
      expect(values[2]).to.equal(230);
    });
  });
});

describe("day 4", async () => {
  const lines = readFile("./test/day4test.txt");
  describe("parse()", () => {
    it("should parse numbers drawn", () => {
      const values = parse(lines);
      expect(values.draw.length).to.equal(27);
    });

    it("should parse boards ", () => {
      const values = parse(lines);
      expect(values.boards.length).to.equal(3);
      expect(values.boards[0].length).to.equal(5);
      expect(values.boards[0][0][0]).to.equal(22);
      expect(values.boards[0][0][1]).to.equal(13);
      expect(values.boards[1][0][0]).to.equal(3);
      expect(values.boards[2].length).to.equal(5);
      //console.log("", values.boards[2]);
    });
  });
  describe("calculations", () => {
    it("should process test input", () => {
      const values = day4Calculations(lines);
      expect(values[1]).to.equal(4512);
      expect(values[2]).to.equal(1924);
    });
  });
});

describe("day 5", async () => {
  const lines = readFile("./test/day5test.txt");
  describe("calculations()", () => {
    it("count overlapping points", () => {
      const points = day5Calculations(lines);
      expect(points[1]).to.equal(12);
    });
  });

  describe("fill()", () => {
    it("should fill grid", () => {
      const grid = fill(lines);
      //console.log(grid);
      expect(grid[9][1]).to.equal(2);
      expect(grid[0][7]).to.equal(1);
    });
  });

  describe("buildLine()", () => {
    it("should interpolate horisontally", () => {
      const values = buildLine(0, 0, 2, 0);
      expect(values).to.deep.equal([
        [0, 0],
        [1, 0],
        [2, 0],
      ]);
    });
    it("should interpolate horisontally", () => {
      const values = buildLine(2, 0, 0, 0);
      expect(values).to.deep.equal([
        [2, 0],
        [1, 0],
        [0, 0],
      ]);
    });
    it("should interpolate vertically", () => {
      const values = buildLine(2, 1, 2, 4);
      expect(values).to.deep.equal([
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
      ]);
    });

    it("should interpolate vertically", () => {
      const values = buildLine(2, 4, 2, 1);
      expect(values).to.deep.equal([
        [2, 4],
        [2, 3],
        [2, 2],
        [2, 1],
      ]);
    });

    it("should interpolate diagonals ascending", () => {
      const values = buildLineDiagonal(1, 1, 3, 3);
      expect(values).to.deep.equal([
        [1, 1],
        [2, 2],
        [3, 3],
      ]);
    });

    it("should interpolate diagonals descending", () => {
      const values = buildLineDiagonal(3, 3, 1, 1);

      expect(values).to.deep.equal([
        [3, 3],
        [2, 2],
        [1, 1],
      ]);
    });

    it("should interpolate diagonals descending x", () => {
      const values = buildLineDiagonal(9, 7, 7, 9);

      expect(values).to.deep.equal([
        [9, 7],
        [8, 8],
        [7, 9],
      ]);
    });

    it.skip("should interpolate diagonals descending y", () => {
      const values = buildLineDiagonal(7, 9, 7, 7);

      expect(values).to.deep.equal([
        [7, 9],
        [8, 8],
        [7, 7],
      ]);
    });
  });
});

describe("day6", () => {
  describe("days()", () => {
    const start = [3, 4, 3, 1, 2];
    it("should decrease value by 1", () => {
      const result = days(start, 1);
      expect(result).to.deep.equal([2, 3, 2, 0, 1]);
    });
    it("should add fish at 0", () => {
      const result = days(start, 2);
      expect(result).to.deep.equal([1, 2, 1, 6, 0, 8]);
    });
    it("should add fish at 0", () => {
      const result = days(start, 80);
      expect(result.length).to.equal(5934);
    });
    it("should add fish at 0", () => {
      const result = daysLarge(start, 256);
      expect(result).to.equal(26984457539);
    });
  });
});

describe("day7", () => {
  describe("leastFuel()", () => {
    const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    it("should find least fuel", () => {
      const fuel = leastFuel(positions);
      expect(fuel).to.equal(37);
    });
  });

  describe("leastFuelExp()", () => {
    const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    it("should find least fuel", () => {
      const fuel = leastFuelExp(positions);
      expect(fuel).to.equal(168);
    });
  });
});
