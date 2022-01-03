import fs from "fs";

export function input(file) {
  return fs.readFileSync(file).toString().trim().split("\n");
}
