module.exports = {
  get (name) {
    const paramName = '--' + name
    const index = process.argv.findIndex(argument => argument === paramName)
    const found = index >= 0
    return found ? process.argv[index + 1] : undefined
  },
  getRequired (name) {
    const value = this.get(name)
    if (value) return value
    else throw new Error(`argument '${name}' is required in @dbetka/sass-watcher`)
  },
}
