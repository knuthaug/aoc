import { expect } from "chai";
import { day3 } from "../3.mjs";
import { input } from "../input.mjs";

describe("day 3", async () => {
  describe("calculations", () => {
    it("should process test input", () => {
      const test = input("./test/3.txt");

      const grid = day3(test);
      expect(grid.point(0, 0)).to.equal(0);
      expect(grid.point(1, 0)).to.equal(1);
      expect(grid.point(0, 3)).to.equal(1);

      //wrap around
      expect(grid.point(0, 14)).to.equal(1);
      expect(grid.point(0, 15)).to.equal(0);

      expect(grid.point(0, 25)).to.equal(1);
      //expect(grid.point(0, 26)).to.equal(0);
    });

    it("should count trees", () => {
      const test = input("./test/3.txt");

      const grid = day3(test);
      expect(grid.path(3, 1)).to.equal(7);
    });
  });
});
