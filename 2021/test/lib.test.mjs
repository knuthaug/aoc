import { expect } from "chai";
import { gt, readFile, take, freq } from "../lib.mjs";

describe("library", async () => {
  describe("gt()", async () => {
    it("gt() should be true/false for input", async () => {
      expect(gt(2, 1)).to.equal(true);
      expect(gt(1, 2)).to.equal(false);
      expect(gt(1, 1)).to.equal(false);
    });
  });

  describe("readFile()", async () => {
    it("should return splitted lines as array", async () => {
      const lines = readFile("1.txt");
      expect(lines.length).to.equal(2000);
    });
    it("should return empty array for invalid filename ", async () => {
      const lines = readFile("foo.txt");
      expect(lines.length).to.equal(0);
    });
  });

  describe("take()", async () => {
    it("should return original array if all match", async () => {
      const test = ["101", "111", "110"];
      expect(take(test, 0, 1).length).to.equal(3);
    });

    it("should filter on first position ", async () => {
      const test = ["101", "011", "110"];
      expect(take(test, 0, 1)).to.deep.equal(["101", "110"]);
    });
    it("should filter on 0", async () => {
      const test = ["101", "011", "110"];
      expect(take(test, 1, 0)).to.deep.equal(["101"]);
    });
  });
});
