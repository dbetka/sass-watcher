const { resolve } = require('path')
const fs = require('fs')
const args = require('../lib/arguments')

module.exports = class Config {
  constructor () {
    this.pwd = process.env.PWD + '/'
    this.unprocessed = {
      pwd: process.env.PWD,
      input: '',
      output: '',
    }

    const JSONConfigPath = args.get('config')
    if (JSONConfigPath) {
      this.setJSONConfig(resolve(this.pwd, JSONConfigPath))
    } else {
      this.unprocessed.input = args.getRequired('input-dir')
      this.unprocessed.output = args.getRequired('output')
      this.input = resolve(this.pwd, this.unprocessed.input)
      this.output = resolve(this.pwd, this.unprocessed.output)
    }
  }

  setJSONConfig (path) {
    const config = JSON.parse(fs.readFileSync(path))
    this.unprocessed.input = config['input-dir']
    this.unprocessed.output = config.output
    this.input = resolve(this.pwd, this.unprocessed.input)
    this.output = resolve(this.pwd, this.unprocessed.output)
  }
}
