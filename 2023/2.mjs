import { readFile } from "./lib.mjs";

const input = readFile("./input/2.txt");

const input2 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

export function day2() {
  const games = input.map((line) => {
    const gameId = Number(line.split(":")[0].split(" ")[1]);
    const turns = line
      .split(":")[1]
      .split(";")
      .map((game) => {
        return game
          .split(",")
          .map((turn) => {
            return turn.trim().split(" ");
          })
          .map((turn) => {
            return {
              color: turn[1],
              count: parseInt(turn[0]),
            };
          });
      });
    return { gameId, turns };
  });

  const sum = games.reduce((acc, game) => {
    for (const rounds of game.turns) {
      for (const turn of rounds) {
        if (turn.count > max[turn.color]) {
          return acc;
        }
      }
    }
    return acc + game.gameId;
  }, 0);
  console.log(sum);

  // part 2
  let sum2 = 0;
  for (const game of games) {
    const localmax = { red: 0, green: 0, blue: 0 };
    for (const rounds of game.turns) {
      for (const turn of rounds) {
        if (turn.count > localmax[turn.color]) {
          localmax[turn.color] = turn.count;
        }
      }
    }

    sum2 += localmax.red * localmax.green * localmax.blue;
  }
  console.log(sum2);
}
