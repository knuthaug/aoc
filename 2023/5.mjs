import { readFile } from "./lib.mjs";
const input = readFile("./input/5.txt");

const order = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

const input2 = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n");

export async function day5() {
  let nearest = Number.MAX_SAFE_INTEGER;
  const maps = parseMaps(input);

  for (const seed of maps.seeds) {
    const path = [];
    for (const mapName of order) {
      let current = path.length ? path[path.length - 1] : seed;
      const map = maps[mapName];
      let found = false;
      for (const entry of map) {
        if (current >= entry.source && current < entry.source + entry.len) {
          found = true;
          path.push(lookup(current, entry));
        }
      }
      if (!found) {
        path.push(current);
      }
    }
    if (path[path.length - 1] < nearest) {
      nearest = path[path.length - 1];
    }
  }
  nearest = console.log("1:", nearest);

  // part deux
  nearest = Number.MAX_SAFE_INTEGER;

  const seedRanges = [];
  for (let i = 0; i < maps.seeds.length; ) {
    seedRanges.push({
      start: maps.seeds[i],
      len: maps.seeds[i + 1],
    });
    i += 2;
  }
  maps.seeds = seedRanges;

  const mapped = {};
  for (const seed of maps.seeds) {
    for (let i = seed.start; i < seed.start + seed.len; i++) {
      let currentSeed = i;
      const path = [];
      for (const mapName of order) {
        let current = path.length ? path[path.length - 1] : currentSeed;
        const map = maps[mapName];
        let found = false;
        for (const entry of map) {
          if (current >= entry.source && current < entry.source + entry.len) {
            found = true;
            path.push(lookup(current, entry));
          }
        }
        if (!found) {
          path.push(current);
        }
      }
      if (path[path.length - 1] < nearest) {
        nearest = path[path.length - 1];
      }
    }
  }

  nearest = console.log("2:", nearest);
}

function lookup(seed, map) {
  return map.dest + (seed - map.source);
}

function parseMaps(input) {
  let currentMapName = "";
  let currentMap = [];
  let all = {};
  for (const line of input) {
    if (line.match(/^seeds:/)) {
      const seeds = line
        .substring(line.indexOf(":") + 1)
        .trim()
        .split(" ")
        .map((x) => parseInt(x, 10));
      all.seeds = seeds;
    } else if (line.match(/^(\w+)-to-(\w+) map:/)) {
      currentMapName = line.substring(0, line.indexOf(" "));
    } else if (line.match(/^\d+/)) {
      const numbers = line
        .trim()
        .split(" ")
        .map((x) => parseInt(x, 10));
      currentMap.push({
        dest: numbers[0],
        source: numbers[1],
        len: numbers[2],
      });
    } else {
      if (currentMapName) {
        all[currentMapName] = currentMap;
        currentMap = [];
      }
    }
  }
  all[currentMapName] = currentMap;
  return all;
}
