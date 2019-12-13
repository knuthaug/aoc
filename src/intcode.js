const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_TRUE = 5
const JUMP_FALSE = 6
const LESS_THAN = 7
const EQUALS = 8
const ADJUST_RELATIVE_BASE = 9

function parseOperator(fullOperator) {
  let parts = (fullOperator + '').split('')
  const op = parseInt(parts.slice(parts.length - 2).join(''))
  let params = []

  parts = padOperator(parts, op)

  for(let i = (parts.length - 3);i >= 0; i--) {
    if(parts[i] === '0') {
      params.push('P')
    } else if (parts[i] === '2') {
      params.push('R')
    } else {
      params.push('I')
    }
  }

  return {op, params}
}

function padOperator(parts, op) {
  let len = 0
  if([1, 2, 7, 8].includes(op)) {
    len = 5
  } else if ([5, 6].includes(op)) {
    len = 4
  } else if ([3, 4, 9].includes(op)) {
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
  5: (arg1, arg2, fallback) => arg1 !== 0 ? arg2: fallback,
  6: (arg1, arg2, fallback) => arg1 === 0 ? arg2: fallback,
  7: (a, b) => a < b ? 1 : 0,
  8: (a, b) => a === b ? 1 : 0,
  3: () => 42,
  4: (arg) => arg

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

function run(program, inputs, returnOutput = false) {
  let position = 0
  let inputPosition = 0
  let relativeBase = 0

  //larger memory
  for(let i = 0; i < 10000; i++) {
    program.push(0)
  }

  while(true) {
    if(position >= program.length) {
      break;
    }

    const cmd = parseOperator(program.slice(position, position + 1))

    if(cmd.op=== 99) {
      break;
    }

    if(cmd.op === ADD || cmd.op === MULTIPLY) {
      const [ arg1, arg2, arg3 ] = findParams(program, cmd, getArguments(program, position, 4))
      program[arg3] = functions[cmd.op](arg1, arg2)
      position += 4
    } else if(cmd.op === INPUT) {
      const [loc] = program.slice(position + 1, position + 2)

      if(cmd.params[0] === 'P') {
        program[loc] = inputs[inputPosition++]
      } else {
        program[loc + relativeBase] = inputs[inputPosition++]
      }
      
      position += 2
    } else if(cmd.op === OUTPUT) {
      const [loc] = findParams(program, cmd, getArguments(program, position, 2))
      let value
      if(cmd.params[0] === 'I') {
        value = functions[cmd.op](loc)
      } else if(cmd.params[0] === 'R'){
        value = functions[cmd.op](program[loc + relativeBase])
      } else {
        value = functions[cmd.op](program[loc])
      }

      if(returnOutput) {
        return value
      } else {
        console.log(value)
      }

      position += 2
    } else if (cmd.op === JUMP_TRUE) { // jump-if-true
      const [arg1, arg2] = findParams(program, cmd, getArguments(program, position, 3))
      position = functions[cmd.op](arg1, arg2, position + 3)
    } else if (cmd.op === JUMP_FALSE) { // jump-if-false
      const [arg1, arg2] = findParams(program, cmd, getArguments(program, position, 3))
      position = functions[cmd.op](arg1, arg2, position + 3)
    } else if (cmd.op === LESS_THAN) { //less-than
      const [arg1, arg2, arg3] = findParams(program, cmd, getArguments(program, position, 4))
      program[arg3] = functions[cmd.op](arg1, arg2)
      position += 4
    } else if (cmd.op === EQUALS) { //equals
      const [arg1, arg2, arg3] = findParams(program, cmd, getArguments(program, position, 4))
      program[arg3] = functions[cmd.op](arg1, arg2)
      position += 4
    } else if (cmd.op === ADJUST_RELATIVE_BASE) {
      const [arg] = program.slice(position + 1, position + 2)
      if(cmd.params[0] === 'I') {
        relativeBase += arg
      } else if (cmd.params[0] === 'P') {
        relativeBase += program[arg]
      } else {
        relativeBase += program[arg + relativeBase]
      }
      position += 2
    }
  }
  return trim(program)
}

function trim(list) {
  for(let i = list.length-1; i >= 0; i--) {
    if(list[i] === 0) {
      list.pop()
    } else {
      break;
    }
  }
  return list
}

module.exports.parseOperator = parseOperator
module.exports.run = run
