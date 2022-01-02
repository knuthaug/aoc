import { expect } from "chai";
import { day2Calculations } from "../2.mjs";
import { day3Calculations } from "../3.mjs";

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
