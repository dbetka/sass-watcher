const [,, ...args] = process.argv

module.exports = {
  get (name) {
    const paramName = '--' + name
    const index = args.findIndex(argument => argument === paramName)
    const found = index >= 0
    return found ? args[index + 1] : undefined
  },
  getRequired (name) {
    const value = this.get(name)
    if (value) return value
    else throw new Error(`argument '${name}' is required in @dbetka/sass-watcher`)
  },
}
