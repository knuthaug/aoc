const tap = require('tap')
const fs = require('fs')

const day1 = require('../src/day1.js')
const day2 = require('../src/day2.js')
const day3 = require('../src/day3.js')
const day4 = require('../src/day4.js')
const day5 = require('../src/day5.js')
const day6 = require('../src/day6.js')
const day8 = require('../src/day8.js')
const day10 = require('../src/day10.js')
const intcode = require('../src/intcode.js')

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
  t.deepEquals(day3.distance(['R8','U5','L5','D3'],
                             ['U7','R6','D4','L4']), '6 30')
  t.deepEquals(day3.distance(['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
                               ['U62','R66','U55','R34','D71','R55','D58','R83']), '159 610')
  t.deepEquals(day3.distance(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
                             ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']), '135 410')
  t.end()
})

tap.test('day4', async t => {
  t.equals(day4.criteria(122345), true)
  t.equals(day4.criteria(12234), false)
  t.equals(day4.criteria(1223445), false)
  t.equals(day4.criteria(111111), true)
  t.equals(day4.criteria(135679), false)
  t.equals(day4.criteria(111123), true)
  t.equals(day4.criteria(223450), false)
  t.equals(day4.criteria(123789), false)

  t.equals(day4.analyze(234560,234600), 4)

  t.equals(day4.criteria(112233), true)
  t.equals(day4.criteria2(123444), false)
  t.equals(day4.criteria2(111122), true)
  t.end()
})

tap.test('intcode lib', async t => {
  t.deepEquals(intcode.run([1,0,0,0,99], 0), [2,0,0,0,99])
  t.deepEquals(intcode.run([2,3,0,3,99], 0), [2,3,0,6,99])
  t.deepEquals(intcode.run([2,4,4,5,99,0], 0), [2,4,4,5,99,9801])
  t.deepEquals(intcode.run([1,1,1,4,99,5,6,0,99], 0), [30,1,1,4,2,5,6,0,99])
  t.deepEquals(intcode.run([1,9,10,3,2,3,11,0,99,30,40,50], 0), [3500,9,10,70,2,3,11,0,99,30,40,50])

  //day5
  //t.deepEquals(intcode.run([3,0,99]), [5,0,99])
  t.deepEquals(intcode.run([1002,4,3,4,33]), [1002, 4, 3, 4, 99])
  t.deepEquals(intcode.run([1101,100,-1,4,0]), [1101,100,-1,4,99])

  t.deepEquals(intcode.run([3,9,8,9,10,9,4,9,99,-1,8], 8, true), 1)
  t.deepEquals(intcode.run([3,9,8,9,10,9,4,9,99,-1,8], 9, true), 0)
  t.deepEquals(intcode.run([3,9,7,9,10,9,4,9,99,-1,8], 7, true), 1)
  t.deepEquals(intcode.run([3,9,7,9,10,9,4,9,99,-1,8], 8, true), 0)
  t.deepEquals(intcode.run([3,3,1108,-1,8,3,4,3,99], 8, true), 1)
  t.deepEquals(intcode.run([3,3,1108,-1,8,3,4,3,99], 7, true), 0)
  t.deepEquals(intcode.run([3,3,1107,-1,8,3,4,3,99], 7, true), 1)
  t.deepEquals(intcode.run([3,3,1107,-1,8,3,4,3,99], 8, true), 0)

  t.deepEquals(intcode.run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0, true), 0)
  t.deepEquals(intcode.run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 1, true), 1)
  t.deepEquals(intcode.run([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0, true), 0)
  t.deepEquals(intcode.run([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 1, true), 1)

  //operator parsing
  t.deepEquals(intcode.parseOperator(1002), { op: 2, params: ['P', 'I', 'P']})
  t.deepEquals(intcode.parseOperator(102), { op: 2, params: ['I', 'P', 'P']})
  t.deepEquals(intcode.parseOperator(2), { op: 2, params: ['P', 'P', 'P']})

  t.deepEquals(intcode.parseOperator(04), { op: 4, params: ['P']})
  t.deepEquals(intcode.parseOperator(104), { op: 4, params: ['I']})
  t.deepEquals(intcode.parseOperator(107), { op: 7, params: ['I', 'P', 'P']})
  t.deepEquals(intcode.parseOperator(07), { op: 7, params: ['P', 'P', 'P']})
  t.deepEquals(intcode.parseOperator(7), { op: 7, params: ['P', 'P', 'P']})
  t.deepEquals(intcode.parseOperator(1107), { op: 7, params: ['I', 'I', 'P']})
  t.deepEquals(intcode.parseOperator(5), { op: 5, params: ['P', 'P']})
  t.deepEquals(intcode.parseOperator(105), { op: 5, params: ['I', 'P']})
  t.deepEquals(intcode.parseOperator(1105), { op: 5, params: ['I', 'I']})

  t.end()
})

tap.test('day5', async t => {
  //t.equals([3,0,4,0,99], '')
  t.end()
})


tap.test('day6', async t => {
  //t.equals(day6.sumOrbits(['B)A']), 1)
  //t.equals(day6.sumOrbits(['B)A', 'D)E']), 2)
  //t.equals(day6.sumOrbits(['B)A', 'C)B']), 3)
  t.equals(day6.sumOrbits(['COM)B', 'B)C','C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']), 42)
  t.end()
})

tap.test('day8', async t => {
  t.deepEquals(day8.findLayers('123456789012', 3, 2), [['123', '456'], ['789', '012']])
  t.equals(day8.decode('0222112222120000', 2, 2), '\u2b1b\u2b1c\n\u2b1c\u2b1b\n')
  t.end()
})

tap.test('day9', async t => {
  t.equals(true, true)
  t.end()
})

tap.test('day10', async t => {
  const ex1 = readAsteroidFile('./test/data/day10-1.txt')
  //t.equals(day10.bestLocation(ex1), 8)

  const ex2 = readAsteroidFile('./test/data/day10-2.txt')
  //t.equals(day10.bestLocation(ex2), 33)

  const ex3 = readAsteroidFile('./test/data/day10-3.txt')
//  t.equals(day10.bestLocation(ex3), 35)
  t.end()
})

function readAsteroidFile(name) {
  return fs.readFileSync(name).toString().trim().split('\n')
}
