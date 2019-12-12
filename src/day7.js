const fs = require('fs');
const intcode = require('./intcode.js')

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().trim().split('\n')
    const program = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
    console.log(testAmplifiers(program))
  })
}

function feedbackLoop(program) {
  const basePermutation = [5, 6, 7, 8, 9]
  const permutations = permutator(basePermutation)

  let max = 0
  for(let i = 0; i < permutations.length; i++) {
    const current = permutations[i]

  }
}

function runAmplifiers(program, phaseSettings, signal) {
  const a = intcode.run(program.slice(), [phaseSettings[0], signal], true)
  const b = intcode.run(program.slice(), [phaseSettings[1], a], true)
  const c = intcode.run(program.slice(), [phaseSettings[2], b], true)
  const d = intcode.run(program.slice(), [phaseSettings[3], c], true)
  return intcode.run(program.slice(), [phaseSettings[4], d], true)
}

function testAmplifiers(program) {
  const basePermutation = [0, 1, 2, 3, 4]
  const permutations = permutator(basePermutation)

  let max = 0

  for(let i = 0; i < permutations.length; i++) {
    const current = permutations[i]
    const signal = runAmplifiers(program, current, 0)

    if(signal > max) {
      max = signal
    }
  }

  return max
}

function permutator (list) {
  let result = [];

  function permute (arr, m = []) {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(list)
  return result
}

module.exports.permutator = permutator
module.exports.feedbackLoop = feedbackLoop
module.exports.testAmplifiers = testAmplifiers
module.exports.main = main
