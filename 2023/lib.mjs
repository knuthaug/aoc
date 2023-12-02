import fs from "fs";

export function gt(a, b) {
  return a > b;
}

export function readFile(fileName) {
  if (fs.existsSync(fileName)) {
    return fs.readFileSync(fileName).toString().trim().split("\n");
  }
  return [];
}

export function parseFile(fileName, parser) {
  return readFile(fileName).map(parser.parse);
}

export function take(list, position, value) {
  return list.filter((el) => {
    const bit = parseInt(el.slice(position, position + 1), 10);
    //console.log(bit, value);
    return bit === value;
  });
}

export function freq(list) {
  return list.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
}
