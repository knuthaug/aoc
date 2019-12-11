const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_TRUE = 5
const JUMP_FALSE = 6
const LESS_THAN = 7
const EQUALS = 8

function parseOperator(fullOperator) {
  let parts = (fullOperator + '').split('')
  const op = parseInt(parts.slice(parts.length - 2).join(''))
  let params = []

  parts = padOperator(parts, op)

  for(let i = (parts.length - 3);i >= 0; i--) {
    params.push(parts[i] === '0' ? 'P' : 'I')
  }

  return {op, params}
}

function padOperator(parts, op) {
  let len = 0
  if([1, 2, 7, 8].includes(op)) {
    len = 5
  } else if ([5, 6].includes(op)) {
    len = 4
  } else if ([3, 4].includes(op)) {
    len = 3
  }

  while(parts.length < len) {
    parts.unshift('0')
  }
  return parts
}

const functions = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
  6: (arg1, arg2, fallback) => arg1 === 0 ? arg2 : fallback,
  7: (a, b) => a < b ? 1 : 0,
  8: (a, b) => a === b ? 1 : 0,
  3: () => 42,
  4: (arg) => console.log(arg)

}

function findParams(program, operator, arguments) {
  const ret = []

  for(let i = 0; i < operator.params.length - 1; i++) {
    if(operator.params[i] === 'I') {
      ret.push(arguments[i])
    } else {
      ret.push(program[arguments[i]])
    }
  }
  if(operator.op === 5 || operator.op === 6) {
    ret.push(operator.params[operator.params.length - 1] === 'I' ? arguments[arguments.length - 1] : program[arguments[arguments.length - 1]])
  } else {
    ret.push(arguments[operator.params.length - 1])
  }

  return ret
}

function getArguments(program, pos, len) {
  return program.slice(pos + 1, pos + len)
}

function run(program, input) {
  let position = 0
  while(true) {
    if(position >= program.length) {
      break;
    }

    const operator = parseOperator(program.slice(position, position + 1))

    if(operator.op === 99) {
      break;
    }

    if(operator.op === ADD || operator.op === MULTIPLY) {
      const [ arg1, arg2, arg3 ] = findParams(program, operator, getArguments(program, position, 4))
      program[arg3] = functions[operator.op](arg1, arg2)
      position += 4
    } else if(operator.op === INPUT) {
      const [loc] = program.slice(position + 1, position + 2)
      program[loc] = input
      position += 2
    } else if(operator.op === OUTPUT) {
      const [loc] = findParams(program, operator, getArguments(program, position, 2))
      if(operator.params[0] === 'I') {
        functions[operator.op](loc)
      } else {
        functions[operator.op](program[loc])
      }
      position += 2
    } else if (operator.op === JUMP_TRUE) { // jump-if-true
      const [arg1, arg2] = findParams(program, operator, getArguments(program, position, 3))
      if(arg1 !== 0) {
        position = arg2
      } else {
        position += 3
      }
    } else if (operator.op === JUMP_FALSE) { // jump-if-false
      const [arg1, arg2] = findParams(program, operator, getArguments(program, position, 3))
      position = functions[operator.op](arg1, 3)
    } else if (operator.op === LESS_THAN) { //less-than
      const [arg1, arg2, arg3] = findParams(program, operator, getArguments(program, position, 4))
      program[arg3] = functions[operator.op](arg1, arg2)
      position += 4
    } else if (operator.op === EQUALS) { //equals
      const [arg1, arg2, arg3] = findParams(program, operator, getArguments(program, position, 4))
      program[arg3] = functions[operator.op](arg1, arg2)
      position += 4
    }
  }
  return program
}

module.exports.parseOperator = parseOperator
module.exports.run = run
