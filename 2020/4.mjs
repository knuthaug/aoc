import { input } from "./input.mjs";

export class Passport {
  byr = 0;
  iyr = 0;
  eyr = 0;
  hgt = 0;
  hcl = 0;
  ecl = 0;
  pid = 0;
  cid = 0;

  constructor(string) {
    let numFields = 0;
    const fields = string.split(" ");
    for (const field of fields) {
      const [key, value] = field.split(":");
      if (key !== "") {
        numFields++;
        this[key] = value;
      }
    }
    this.validation(numFields);
  }

  validation(numFields) {
    if (this.byr.length !== 4 || this.byr < 1920 || this.byr > 2002) {
      return (this.isValid = false);
    }
    if (this.iyr.length !== 4 || this.iyr < 2010 || this.iyr > 2020) {
      return (this.isValid = false);
    }
    if (this.eyr.length !== 4 || this.eyr < 2020 || this.eyr > 2030) {
      return (this.isValid = false);
    }

    if (this.hgt) {
      const met = this.hgt.substring(this.hgt.length - 2, this.hgt.length);
      let num = "";
      if (met === "in") {
        num = this.hgt.substring(0, 2);
        if (this.hgt.length !== 4 || num < 59 || num > 76) {
          return (this.isValid = false);
        }
      } else {
        num = this.hgt.substring(0, 3);
        if (this.hgt.length !== 5 || num < 150 || num > 193) {
          return (this.isValid = false);
        }
      }
    }

    if (this.hcl.length !== 7 || !this.hcl.toString().match(/#[a-f0-9]{6}/)) {
      return (this.isValid = false);
    }

    if (
      this.ecl.length !== 3 ||
      !this.ecl.toString().match(/amb|blu|brn|gry|grn|hzl|oth/)
    ) {
      return (this.isValid = false);
    }

    if (this.pid.length !== 9 || !this.pid.toString().match(/[0-9]{9}/)) {
      return (this.isValid = false);
    }

    if (numFields === 8 || (numFields === 7 && this.cid === 0)) {
      return (this.isValid = true);
    }
  }

  valid() {
    return this.isValid;
  }
}

class Passports {
  list = [];
  constructor(lines) {
    let passport = "";
    for (const line of lines) {
      if (line !== "") {
        passport += " " + line;
      } else {
        this.list.push(new Passport(passport.split("\n").join(" ")));
        passport = "";
      }
    }
    this.list.push(new Passport(passport.split("\n").join(" ")));
  }

  valid() {
    return this.list.filter((p) => p.valid()).length;
  }

  all() {
    return this.list;
  }
}

export function day4(lines) {
  return new Passports(lines);
}

const lines = input("4.txt");
const passports = new Passports(lines);
//console.log(passports);
console.log("1:", passports.valid());
