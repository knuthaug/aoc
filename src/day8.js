const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    //console.log(data)
    const imageData = data.toString().trim()
    calculate(imageData, 25, 6)
    decode(imageData, 25, 6)
  })
}

function decode(data, width, height) {
  const layers = findLayers(data, width, height)
  console.log(layers[1])
  let pixels = ''


  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      pixels += firstVisiblePixel(layers, i, j)
    }
    pixels += '\n'
  }
  console.log(pixels)
}

function firstVisiblePixel(layers, x, y) {
  //console.log(layers[0])
  for(let i = 0; i < layers.length; i++) {
    //console.log(`looking a layer ${i}, pos=${x}, ${y}`)
    //console.log(layers[i][x])
    const value = layers[i][x].slice(y, y + 1)
    if(value === '1' || value === '0') {
      //console.log(`value=${value}`)
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

  console.log( (layers[minimumLayer].join('').split('1').length -1) * (layers[minimumLayer].join('').split('2').length -1))
}

function findLayers(data, width, height) {
  //console.log(data)
  let current = 0
  const layers = []

  while(current < data.length) {
    const raw = data.slice(current, current + (width * height))
    let rawStart = 0
    const layer = []
    while(rawStart < raw.length) {
      layer.push(raw.slice(rawStart, rawStart + width))
      rawStart += width
    }
    layers.push(layer)
    current += (width * height)
  }
  //console.log(layers)
  return layers
}

module.exports.decode = decode
module.exports.findLayers = findLayers
module.exports.main = main
