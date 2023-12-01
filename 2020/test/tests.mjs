import { expect } from "chai";
import { day3 } from "../3.mjs";
import { Passport, day4 } from "../4.mjs";
import { findSeat } from "../5.mjs";
import { sum, sumOfAll, sumOfAllYes } from "../6.mjs";
import { input } from "../input.mjs";

describe("day 3", async () => {
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

describe("day 4", async () => {
  it("should do a passport", () => {
    const p = new Passport(
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
    );
    expect(p.byr).to.equal("1937");
    expect(p.iyr).to.equal("2017");

    expect(p.valid()).to.equal(true);
  });

  it("should process test input", () => {
    const test = input("./test/4.test.txt");

    const passports = day4(test);
    //console.log(passports);
    expect(passports.valid()).to.equal(2);
    expect(passports.all().length).to.equal(4);
  });

  it("should validate passports", () => {
    let p = new Passport(
      "eyr:1972 cid:100 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926"
    );
    expect(p.valid()).to.equal(false);

    p = new Passport(
      "iyr:2019 hcl:#602927 eyr:1967 hgt:170cm ecl:grn pid:012533040 byr:1946"
    );
    expect(p.valid()).to.equal(false);

    p = new Passport(
      "hcl:dab227 iyr:2012 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277"
    );
    expect(p.valid()).to.equal(false);

    p = new Passport(
      "hgt:59cm ecl:zzz eyr:2038 hcl:74454a iyr:2023 pid:3556412378 byr:2007"
    );
    expect(p.valid()).to.equal(false);

    // valids
    p = new Passport(
      "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f"
    );
    expect(p.valid()).to.equal(true);

    p = new Passport(
      "eyr:2029 ecl:blu cid:129 byr:1989 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm"
    );
    expect(p.valid()).to.equal(true);

    p = new Passport(
      "hcl:#888785 hgt:164cm byr:2001 iyr:2015 cid:88 pid:545766238 ecl:hzl eyr:2022"
    );
    expect(p.valid()).to.equal(true);

    p = new Passport(
      "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
    );
    expect(p.valid()).to.equal(true);
  });
});

describe("day5", () => {
  it("should find row and seat", () => {
    const [row, seat] = findSeat("FBFBBFFRLR");

    expect(row).to.eq(44);
    expect(seat).to.eq(5);
    expect(row * 8 + seat).to.eq(357);
  });
  it("should find row and seat", () => {
    const [row, seat] = findSeat("BFFFBBFRRR");

    expect(row).to.eq(70);
    expect(seat).to.eq(7);
    expect(row * 8 + seat).to.eq(567);
  });
  it("should find row and seat", () => {
    const [row, seat] = findSeat("BBFFBBFRLL");

    expect(row).to.eq(102);
    expect(seat).to.eq(4);
    expect(row * 8 + seat).to.eq(820);
  });
});

describe("day6", () => {
  it("should count questions", () => {
    expect(sum(["abc"])).to.equal(3);
    expect(sum(["a", "a", "a", "a"])).to.equal(1);
    expect(sum(["b"])).to.equal(1);
  });

  it("should parse sections and sum", () => {
    const lines = input("./test/6.test.txt");
    const totalSum = sumOfAll(lines);
    expect(totalSum).to.deep.equal([11, 6]);
  });

  it("should parse sections and sum for every q", () => {
    expect(sumOfAllYes(["abc"])).to.equal(3);
    expect(sumOfAllYes(["a", "a", "a", "a"])).to.equal(1);
    expect(sumOfAllYes(["ab", "ac"])).to.equal(1);
    expect(sumOfAllYes(["a", "b", "c"])).to.equal(0);
    expect(sumOfAllYes(["b"])).to.equal(1);
  });
});
