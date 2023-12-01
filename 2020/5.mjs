import { input } from "./input.mjs";

const lines = input("./5.txt");
let max = 0;
const ids = [];
for (const line of lines) {
  const [row, seat] = findSeat(line);
  const id = row * 8 + seat;
  ids.push(id);
  if (id > max) {
    max = id;
  }
}
console.log("1:", max);
const sorted = ids.sort((a, b) => a - b);
for (let i = 0; i < sorted.length; i++) {
  if (sorted[i + 1] !== sorted[i] + 1) {
    console.log("2:", sorted[i + 1] - 1);
    break;
  }
}

export function findSeat(pass) {
  const rowSpec = pass.substring(0, 7);
  const seatSpec = pass.substring(7);
  //console.log("row", rowSpec, seatSpec);

  const row = bst(0, 127, rowSpec, "F");
  const seat = bst(0, 7, seatSpec, "L");
  return [row, seat];
}

function bst(start, end, spec, test) {
  for (const char of spec) {
    if (char === test) {
      end -= Math.round((end - start) / 2);
    } else {
      start += Math.round((end - start) / 2);
    }
    //console.log(`char=${char}: start=${start} end=${end}`);
  }
  return end;
}
