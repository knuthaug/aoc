const fs = require('fs');

function main(range) {
  const [from, to] = range.split('-').map(x => parseInt(x))
  console.log(analyze(from, to))
}

function analyze(from, to) {
  let count = 0
  for(let i = from; i <= to; i++) {
    let current = i
    if(criteria(i) && criteria2(i)) {
      count++
    }
  }
  return count
}

function criteria(value) {
  const parts = value.toString().split('').map(x => parseInt(x))
  if(parts.length !== 6) {
    return false
  }

  //increase
  let twin = false
  for(let i = 1; i < parts.length; i++) {
    const num = parts[i]
    if(num < parts[i - 1]) {
      return false;
    }

    if(num === parts[i - 1]) {
      twin = true
    }

  }

  return twin ? true : false
}

function criteria2(value) {
  const parts = value.toString().split('').map(x => parseInt(x))

  const matches = {}
  matches[parts[0]] = 1

  for(let i = 1; i < parts.length; i++) {
    const num = parts[i]
    if(!matches[parts[i]]) {
      matches[parts[i]] = 1
    } else {
      matches[parts[i]]++
    }
  }

  const keys = Object.keys(matches).sort()
  for(let i = 0; i < keys.length; i++) {
    if(matches[keys[i]] === 2) {
      return true
    }
  }
  return false
}

module.exports.analyze = analyze
module.exports.criteria = criteria
module.exports.criteria2 = criteria2
module.exports.main = main
