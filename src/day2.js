const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    const list = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
    const copy = list.slice()
    console.log(run(list)[0])
    copy[1] = 0
    copy[2] = 0
    console.log(find(copy))
  })
}

function find(list) {
  const wanted = 19690720

  for(let noun = 0; noun <=99; noun++) {
    for(let verb = 0; verb <=99; verb++) {
      const plist = permute(list, noun, verb)
      const res = run(plist)[0]
      if(res === wanted) {
        return (100*noun)+verb
      }
    }
  }
  return 'err'
}

function permute(list, noun, verb) {
  const copy = list.slice()
  copy[1] = noun
  copy[2] = verb
  return copy
}

function run(list) {
  let pos = 0
  while(true) {
    if(pos >= list.length) {
      break;
    }

    const set = list.slice(pos, pos + 4)
    const [ op, loc1, loc2, loc3 ] = set

    if(op === 99) {
      break;
    }

    if(op === 1) {
      list[loc3] = list[loc1] + list[loc2]
    }

    if(op === 2) {
      list[loc3] = list[loc1] * list[loc2]
    }
    pos += 4
  }

  return list
}

module.exports.run = run
module.exports.findCombination = find
module.exports.main = main
