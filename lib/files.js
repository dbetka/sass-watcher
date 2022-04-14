const path = require('path')
const { mkdirSync } = require('fs')
const { readdir } = require('fs').promises
const { writeFile, existsSync } = require('fs')

function writeTextIntoFile (destination, text) {
  return new Promise((resolve, reject) => {
    if (existsSync(destination) === false) {
      const dirname = path.dirname(destination)
      mkdirSync(dirname, { recursive: true })
    }
    writeFile(destination, text, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function getAllFrom (dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getAllFrom(res) : res
  }))
  return Array.prototype.concat(...files)
}

module.exports = {
  writeTextIntoFile,
  getAllFrom,
}
