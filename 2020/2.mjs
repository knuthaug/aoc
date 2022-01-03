import { input } from "./input.mjs";

const lines = input("2.txt");

//const lines = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

let count = 0;
for (const line of lines) {
  const [specChar, min, max, password] = parse(line);

  let charCount = 0;
  for (let char of password) {
    if (char === specChar) {
      charCount++;
    }
  }
  if (charCount >= min && charCount <= max) {
    count++;
  }
}
console.log("1: ", count);

count = 0;
for (const line of lines) {
  const [specChar, pos1, pos2, password] = parse(line);
  const chars = password.split("");
  chars.unshift("");
  //console.log(pos1, pos2, specChar, chars[pos1], chars[pos2]);
  if (
    (chars[pos1] === specChar && chars[pos2] !== specChar) ||
    (chars[pos2] === specChar && chars[pos1] !== specChar)
  ) {
    count++;
  }
}
console.log("2: ", count);

function parse(line) {
  const [spec, password] = line.split(":").map((el) => el.trim());
  const [part, specChar] = spec.split(" ");
  const [min, max] = part.split("-").map((num) => parseInt(num, 10));
  return [specChar, min, max, password];
}
