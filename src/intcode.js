var inquirer = require('inquirer');
var Promise = require('bluebird')
const readline = require('readline')

function input () {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

function ask(question) {
  return new Promise(function (resolve) {
    input().question('input', data => {
      resolve(parseInt(data.toString().trim()))
    })
  })
}

const functions = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
  3: () => 42,
  4: (arg) => console.log(arg)

}

function run(list) {

  let pos = 0
  while(true) {
    if(pos >= list.length) {
      break;
    }

    const [operator] = list.slice(pos, pos + 1)

    if(operator === 99) {
      break;
    }

    if(operator === 1 || operator === 2) {
      const [ loc1, loc2, loc3 ] = list.slice(pos + 1, pos + 4)
      list[loc3] = functions[operator](list[loc1], list[loc2])
      pos += 4
    } else if(operator === 3 || operator === 4) {
      const [loc] = list.slice(pos + 1, pos + 2)
      functions[operator](list[loc])
      pos += 2
    }
  }
  return list
}

module.exports.run = run
