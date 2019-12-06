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
  delete(paths['undefined'])
  let orbitCount = 0
  let current

  const keys = Object.keys(paths)

  for(let i = 0; i < keys.length; i++) {

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

  console.log(`shortest path: ${findShortestPath(paths, 'YOU', 'SAN')}`)

  return orbitCount
}

function iterate(paths, start) {
  const result = []
  let current = paths[start]
  
  while(current !== 'COM') {
    result.push(current)
    current = paths[current]
  }
  return result
}

function findShortestPath(paths, start, end) {
  const startPath = iterate(paths, start)
  let endPath = iterate(paths, end)

  //find index of shortest common ancestor
  let commonAncestorIndex = 0
  for(let i = startPath.length; i> 0; i--) {
    const found = endPath.findIndex(x => x === startPath[i])
    if(found !== -1) {
      commonAncestorIndex = found
    }
  }
  const secondindex = startPath.findIndex(x => x === endPath[commonAncestorIndex])
  //console.log(commonAncestorIndex + secondindex)
  return commonAncestorIndex + secondindex

}

module.exports.sumOrbits = sumOrbits
module.exports.main = main
