const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    const list = lines.map((l) => {
      return l.split(',')
    })
    //console.log(list)
    console.log(distance(list[0], list[1]))
  })
}

function distance(wire1, wire2) {

  var path1 = getPath(wire1);
  var path2 = getPath(wire2);

  const keys1 = Object.keys(path1)
  const keys2 = Object.keys(path2)
  const intersections = keys1.filter(x => keys2.includes(x))
  const distances = intersections.map((i) => {
    const p = i.split(',')
    const o = { x: parseInt(p[0]), y: parseInt(p[1])}

    return mdistance(0, 0, o.x, o.y)
  }).sort((a, b) => a - b)

  const steps = intersections.map((i) => {
    return path1[i] + path2[i]
  }).sort((a, b) => a - b)
  return `${distances[0]} ${steps[0]}`
}

function distance2(wire1, wire2) {
  let [coords, intersects] = go(wire1, false)

  let [coords2, intersects2] = go(wire2, true, coords)

  const distances = intersects2.map((i) => {
    return mdistance(0, 0, i.x, i.y)
  }).sort((a, b) => a - b)
  //console.log(distances)
  return distances[0]
}

function getPath(wire) {
  const path = {}
  let x = 0
  let y = 0
  let pathLength = 0

  for(let i = 0; i < wire.length; i++) {
    const cmd = parse(wire[i])

    for(let j = 0; j < cmd.length; j++)
    if(cmd.direction === 'R' ) {
      path[`${++x},${y}`] = ++pathLength
    } else if(cmd.direction === 'D' ) {
      path[`${x},${--y}`] = ++pathLength
    } else if(cmd.direction === 'L' ) {
      path[`${--x},${y}`] = ++pathLength
    } else if(cmd.direction === 'U' ) {
      path[`${x},${++y}`] = ++pathLength
    }
  }

  return path
}

function go(wire, hit, coords = []) {
  const intersects = [] //intersections coordinates
  let x = 0
  let y = 0

  for(let i = 0; i < wire.length; i++) {
    //console.log(`doing wire instruction ${i}`)
    const cmd = parse(wire[i])
    const newXY = newCoords(x, y, cmd.direction, cmd.length)

    if(x === newXY.x) { // same x, vertical movement
      if(newXY.y < y) {
        for(let f = y; f >= newXY.y; f--) {
          mark(coords, intersects, x, f, hit)
        }
      } else {
        for(let f = y; f <= newXY.y; f++) {
          mark(coords, intersects, x, f, hit)
        }
      }
    } else if(y === newXY.y) { // same y, horisontal movement
      if(newXY.x < x) {
        for(let f = x; f >= newXY.x; f--) {
          mark(coords, intersects, f, y, hit)
        }
      } else {
        for(let f = x; f <= newXY.x; f++) {
          mark(coords, intersects, f, y, hit)
        }
      }
    }

    x = newXY.x
    y = newXY.y
  }

  return [coords, intersects]
}

function mark(coords, intersections, x, y, hit) {
  const found = coords.find((coord) => {
    return coord.x === x && coord.y === y
  })

  if(hit && found) {
    intersections.push({x, y})
  } else if(!hit){
    coords.push({x, y})
  }
}

function newCoords(startx, starty, direction, length) {
  if(direction === 'R') {
    return {x :startx + length, y: starty}
  } else if (direction === 'L') {
    return {x: startx - length, y: starty}
  } else if (direction === 'U') {
    return {x: startx, y: starty + length}
  }

  // Down
  return {x: startx, y: starty - length}
}

function parse(vector) {
  const parts = vector.split('')
  return { direction: parts[0], length: parseInt(parts.slice(1).join(''))}
}

function mdistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

module.exports.parse = parse
module.exports.distance = distance
module.exports.main = main
