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
