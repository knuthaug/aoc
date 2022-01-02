import { expect } from "chai";
import { day2Calculations } from "../2.mjs";
import { day3Calculations } from "../3.mjs";
import { day4Calculations, parse } from "../4.mjs";
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
