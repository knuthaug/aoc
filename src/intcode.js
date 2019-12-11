
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
  ret.push(arguments[operator.params.length - 1])

  return ret
}

function run(program, input) {

  let pos = 0
  while(true) {
    if(pos >= program.length) {
      break;
    }

    const operator = parseOperator(program.slice(pos, pos + 1))

    if(operator.op === 99) {
      break;
    }

    if(operator.op === 1 || operator.op === 2) {
      const [ arg1, arg2, arg3 ] = findParams(program, operator, program.slice(pos + 1, pos + 4))
      program[arg3] = functions[operator.op](arg1, arg2)
      pos += 4
    } else if(operator.op === 3) {
      const [loc] = program.slice(pos + 1, pos + 2)
      program[loc] = input
      pos += 2
    } else if(operator.op === 4) {
      const [loc] = findParams(program, operator, program.slice(pos + 1, pos + 2))
      if(operator.params[0] === 'I') {
        functions[operator.op](loc)
      } else {
        functions[operator.op](program[loc])
      }
      pos += 2
    } else if (operator.op === 5) { // jump-if-true
      const [arg1, arg2] = findParams(program, operator, program.slice(pos + 1, pos + 3))
      if(arg1 !== 0) {
        pos = arg2
      }
    } else if (operator.op === 5) { // jump-if-false
      const [arg1, arg2] = findParams(program, operator, program.slice(pos + 1, pos + 3))
      if(arg1 === 0) {
        pos = arg2
      }
    } else if (operator.op === 7) { //less-than
      const [arg1, arg2, arg3] = findParams(program, operator, program.slice(pos + 1, pos + 4))
      if(arg1 < arg2) {
        program[arg3] = 1
      } else {
        program[arg3] = 0
      }
      pos += 4
    } else if (operator.op === 8) { //equals
      const [arg1, arg2, arg3] = findParams(program, operator, program.slice(pos + 1, pos + 4))
      if(arg1 === arg2) {
        program[arg3] = 1
      } else {
        program[arg3] = 0
      }
      pos += 4
    }
  }
  return program
}

module.exports.parseOperator = parseOperator
module.exports.run = run
