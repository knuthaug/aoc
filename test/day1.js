const tap = require('tap')

const day1 = require('../src/day1.js')
const day2 = require('../src/day2.js')
const day3 = require('../src/day3.js')

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

tap.test('day3', async t => {
  t.deepEquals(day3.parse('R75'), { direction: 'R', length: 75})
  t.deepEquals(day3.makeMap(3), [[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  t.deepEquals(day3.distance(['R8','U5','L5','D3'],
                             ['U7','R6','D4','L4']), 6)
  t.deepEquals(day3.distance(['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
                               ['U62','R66','U55','R34','D71','R55','D58','R83']), 159)
  t.deepEquals(day3.distance(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
                             ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']), 135)
  t.end()
})
