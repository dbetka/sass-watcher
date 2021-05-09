const { Reset, FgRed, FgGreen, FgCyan } = require('../lib/console-colors')

const info = {
  pwd: '',
  input: '',
  output: '',
}

function initMessage ({ pwd, input, output }) {
  info.pwd = pwd
  info.input = input.replace(pwd, '')
  info.output = output.replace(pwd, '')
}

function message ({ result = 'Processing...', action = 'Watching...', done = false }) {
  const log = (...params) => console.log(params.join('') + Reset)
  console.clear()
  log(FgRed, 'sass-watcher', Reset, '        @dbetka')
  log('  pwd:     ', info.pwd)
  log('  input:   ', info.input)
  log('  output:  ', info.output)
  log('  status:  ', FgCyan, action)
  log('  ')
  log('  result:  ', FgCyan, (done ? FgGreen + 'Cached!' : result))
}

module.exports = {
  initMessage,
  message,
}
