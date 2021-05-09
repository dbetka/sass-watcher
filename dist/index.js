const path = require('path')
const chokidar = require('chokidar')
const { initMessage, message } = require('../lib/message')
const args = require('../lib/arguments')
const files = require('../lib/files')

const pwd = process.env.PWD + '/'
const input = path.resolve(pwd, args.getRequired('input-dir'))
const output = path.resolve(pwd, args.getRequired('output'))

initMessage({ pwd, input, output })

const isCache = (path) => path.indexOf('__cache__') >= 0
let timeoutId = null

message({ action: 'Initialization...' })

setTimeout(() => {
  createStyleCache().then(() => message({ done: true }))

  function onChange (path) {
    message({ action: 'Indexing...' })

    if (isCache(path) === false) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        createStyleCache().then(() => message({ done: true }))
      }, 500)
    }
  }

  chokidar.watch(input, { persistent: true, ignoreInitial: true })
    .on('add', path => onChange(path))
    .on('unlink', path => onChange(path))
}, 500)

function createStyleCache () {
  return files.getAllFrom(input)
    .then(array => {
      let fileContent = ''
      for (const file of array) {
        const fileSrc = file.replace(pwd, '')
        if (fileSrc.indexOf('__cache__') >= 0) continue
        fileContent += `@import "${fileSrc}"\n`
      }
      return files.writeTextIntoFile(output, fileContent)
    })
}
