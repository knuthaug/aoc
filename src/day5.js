const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    const list = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
  })
}

const functions = {
  1: (a, b) => a + b,
  2: (a, b) => a * b
}

function run(list) {
  let pos = 0
  while(true) {
    if(pos >= list.length) {
      break;
    }

    const operator = list.slice(pos, pos + 1)[0]

    if(operator === 99) {
      break;
    }

    if(operator === 1 || operator === 2) {
      const [ loc1, loc2, loc3 ] = list.slice(pos + 1, pos + 4)
      pos += 4
      list[loc3] = functions[operator](list[loc1], list[loc2])
    } else if(operator === 3 || operator === 4) {
      const [loc] = list.slice(pos + 1, pos + 2)
      pos += 2
    }
  }

  return list
}

function add(first, second, location) {
  
}

module.exports.run = run
module.exports.main = main
