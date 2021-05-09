const { resolve } = require('path')
const fs = require('fs')
const args = require('../lib/arguments')

module.exports = class Config {
  constructor () {
    this.pwd = process.env.PWD + '/'
    const JSONConfigPath = args.get('config')
    if (JSONConfigPath) {
      this.setJSONConfig(resolve(this.pwd, JSONConfigPath))
    } else {
      this.input = resolve(this.pwd, args.getRequired('input-dir'))
      this.output = resolve(this.pwd, args.getRequired('output'))
    }
  }

  setJSONConfig (path) {
    const config = JSON.parse(fs.readFileSync(path))
    this.input = config['input-dir']
    this.output = config.output
  }
}
