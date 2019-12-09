const fs = require('fs');
const intcode = require('./intcode.js')
const inquirer = require('inquirer')

function main(filename) {
  const f = intcode.run(filename.split(',').map(i => parseInt(i)), 42)
  console.log(f)
  return
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    const list = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
  })
}

module.exports.main = main
