const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    console.log(`sum orbits: ${sumOrbits(lines)}`)
  })
}

function sumOrbits(orbits) {
  const paths = {}
  for(let i = 0; i < orbits.length; i++) {
    const [center, orbiter] = orbits[i].split(')')
    paths[orbiter] = center
  }

  let orbitCount = 0
  let current

  const keys = Object.keys(paths)

  for(let i = 0; i < keys.length; i++) {
    if(keys[i] === 'undefined') {
      break;
    }
    const key = keys[i]
    current = paths[key]
    if(current === 'COM') {
      orbitCount++
      continue;
    }

    while(current !== 'COM') {
      orbitCount++
      current = paths[current]
    }
    orbitCount++
  }
  return orbitCount
}

module.exports.sumOrbits = sumOrbits
module.exports.main = main
