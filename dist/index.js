#!/usr/bin/env node

const chokidar = require('chokidar')
const { initMessage, message } = require('../lib/message')
const files = require('../lib/files')
const Config = require('../lib/config')

const config = new Config()

initMessage(config)

let timeoutId = null

message({ action: 'Initialization...' })

setTimeout(() => {
  createStyleCache().then(() => message({ done: true }))

  function onChange (path) {
    message({ action: 'Indexing...' })
    const isNotOutput = path !== config.output

    if (isNotOutput) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        createStyleCache().then(() => message({ done: true }))
      }, 500)
    }
  }

  chokidar.watch(config.input, { persistent: true, ignoreInitial: true })
    .on('add', path => onChange(path))
    .on('unlink', path => onChange(path))
}, 500)

function createStyleCache () {
  return files.getAllFrom(config.input)
    .then(array => {
      let fileContent = ''
      for (const file of array) {
        if (file === config.output) continue
        const fileSrc = file.replace(config.pwd, '')
        fileContent += `@import "${fileSrc}"\n`
      }
      return files.writeTextIntoFile(config.output, fileContent)
    })
}
