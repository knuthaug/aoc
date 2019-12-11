const fs = require('fs');
const intcode = require('./intcode.js')
const inquirer = require('inquirer')

function main(filename) {
  //const f = intcode.run(filename.split(',').map(i => parseInt(i)), 0)
  //return

  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    const list = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
    console.log('first part:')
    intcode.run(list.slice(), 1)
    console.log('second part:')
    intcode.run(list, 5)
  })
}

module.exports.main = main
