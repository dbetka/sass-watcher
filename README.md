# @dbetka/sass-watcher
Script to generate file with cached sass imports.

## Installation
```bash
npm i -D @dbetka/sass-watcher
```

## Usage

With arguments in `package.json`
```json
{
  "scripts": {
    "sass-watcher": "node @dbetka/sass-watcher --input-dir src/style/ --output src/style/__cache__/index.sass",
    [...]
  }
}
```

With config file in `package.json`
```json
{
  "scripts": {
    "sass-watcher": "node @dbetka/sass-watcher --config configs/sass-watcher.json",
    [...]
  }
}
```


