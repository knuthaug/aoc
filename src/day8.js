const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const imageData = data.toString().trim()
    console.log(calculate(imageData, 25, 6))
    console.log(decode(imageData, 25, 6))
  })
}

function decode(data, width, height) {
  const layers = findLayers(data, width, height)
  let pixels = ''

  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      pixels += firstVisiblePixel(layers, i, j)
    }
    pixels += '\n'
  }
  return pixels
}

function firstVisiblePixel(layers, x, y) {
  for(let i = 0; i < layers.length; i++) {
    const value = layers[i][x].slice(y, y + 1)
    if(value !== '2') {
      return value === '0' ? '\u2b1b': '\u2b1c'
    }
  }
}

function calculate(data, width, height) {
  const layers = findLayers(data, width, height)
  let minimumZeroes = 100000
  let minimumLayer = -1

  for (let i = 0; i < layers.length-1; i++) {
    const currentLayer = layers[i]
    let zeroes = currentLayer.join('').split('0').length -1
    if (zeroes < minimumZeroes) {
      minimumZeroes = zeroes
      minimumLayer = i
      zeroes = 0
    }
  }

  return (layers[minimumLayer].join('').split('1').length -1) * (layers[minimumLayer].join('').split('2').length -1)
}

function findLayers(data, width, height) {
  let current = 0
  const layers = []

  while(current < data.length) {
    const row = data.slice(current, current + (width * height))
    let placeInRow = 0
    const layer = []
    while(placeInRow < row.length) {
      layer.push(row.slice(placeInRow, placeInRow + width))
      placeInRow += width
    }
    layers.push(layer)
    current += (width * height)
  }
  return layers
}

module.exports.decode = decode
module.exports.findLayers = findLayers
module.exports.main = main
