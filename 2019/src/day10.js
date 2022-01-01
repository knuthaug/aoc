const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().trim().split('\n')
    console.log(bestLocation(lines))
  })
}

function bestLocation(lines) {
  const data = lines.map((l) => {
    return l.split('').map((i) => {
      return i === '.' ? 0 : 1
    })
  })

  //console.log(data)
  return countLineOfSight(data)
}

function countLineOfSight(data) {
  const counts = []
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      counts[i][j] = countLineOfSightForOne(data, j, i)
    }
  }
  console.log(counts)
}

function countLineOfSightForOne(data, x, y) {
  let count = 0
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      if(j === x && i === y) {
        continue
      }

      const point = { x: i, y: j}
    }
  }
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function isBetween(a, c, b) {
  return distance(a, c) + distance(c, b) == distance(a, b)
}


module.exports.bestLocation = bestLocation

module.exports.main = main
