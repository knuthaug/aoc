const tap = require('tap')

const day1 = require('../src/day1.js')
const day2 = require('../src/day2.js')

tap.test('day1', async t => {
  t.equals(day1.fuelForMass(12), 2)
  t.equals(day1.fuelForMass(14), 2)
  t.equals(day1.fuelForMass(1969), 654)
  t.equals(day1.fuelForMass(62566), 20853)
  t.equals(day1.fuelForMass(100756), 33583)
  t.equals(day1.sumFuel([12, 1969, 14]), 660)

  t.end()
})

tap.test('day2', async t => {
  t.deepEquals(day2.run([1,0,0,0,99], 0), [2,0,0,0,99])
  t.deepEquals(day2.run([2,3,0,3,99], 0), [2,3,0,6,99])
  t.deepEquals(day2.run([2,4,4,5,99,0], 0), [2,4,4,5,99,9801])
  t.deepEquals(day2.run([1,1,1,4,99,5,6,0,99], 0), [30,1,1,4,2,5,6,0,99])
  t.deepEquals(day2.run([1,9,10,3,2,3,11,0,99,30,40,50], 0), [3500,9,10,70,2,3,11,0,99,30,40,50])
  t.end()
})
