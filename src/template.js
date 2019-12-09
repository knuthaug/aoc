const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().trim().split('\n')
    const list = lines[0].split(',').map((i) => {
      return parseInt(i)
    })
  })
}

module.exports.main = main
