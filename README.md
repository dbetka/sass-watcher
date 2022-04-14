# @dbetka/sass-watcher
Script to generate file with cached sass imports.

## Installation
```bash
npm i -D @dbetka/sass-watcher
```

## Usage in package.json

With arguments in `package.json`
```json
{
  "scripts": {
    "sass-watcher": "sass-watcher --input-dir src/style/ --output src/style/__cache__/index.sass"
  }
}
```

With config file in `package.json`
```json
{
  "scripts": {
    "sass-watcher": "sass-watcher --config configs/sass-watcher.json"
  }
}
```

## Example config file
```json
{
  "input-dir": "src/style/auto-import",
  "output": "src/style/__cache__/index.sass"
}
```

## Usage in code
src/style/index.sass file
```sass
@import "__cache__/index"

// Rest imports
```
