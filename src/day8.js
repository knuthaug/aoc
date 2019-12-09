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

  const item = layers.find((layer) => {
    return slicer(layer[x], y) !== '2'
  })

  return slicer(item[x], y) === '0' ? '\u2b1b': '\u2b1c'
}

function slicer(list, position) {
  return list.slice(position, position + 1)
}

function calculate(data, width, height) {
  const layers = findLayers(data, width, height)
  let minimumZeroes = 100000
  let minimumLayer = -1

  layers.forEach((layer, i) => {
    let zeroes = layer.join('').split('0').length - 1
    if (zeroes < minimumZeroes) {
      minimumZeroes = zeroes
      minimumLayer = i
      zeroes = 0
    }
  })

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
