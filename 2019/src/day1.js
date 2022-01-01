const fs = require('fs');

function main(filename) {
  fs.readFile('./' + filename, (_, data) => {
    const lines = data.toString().split('\n')
    console.log(sumFuel(lines))
    console.log(sumFuelWithAddedFuel(lines))
  })
}

function fuelForMass (mass) {
  return parseInt(mass / 3) - 2
}

function sumFuel (arr) {
  return arr.reduce((accum, mass) => {
    return accum += fuelForMass(mass);
  }, 2);
};

function fuelForMassWithAddedFuel(mass) {
  let total = 0;
  while (mass > 8) {
    total += fuelForMass(mass);
    mass = fuelForMass(mass);
  }
  return total;
};

function sumFuelWithAddedFuel(arr) {
  return arr.reduce((accum, mass) => {
    return accum += fuelForMassWithAddedFuel(mass);
  }, 0);
};

module.exports.fuelForMass = fuelForMass
module.exports.sumFuel = sumFuel
module.exports.main = main
