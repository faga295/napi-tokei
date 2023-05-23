# napi-tokei

`napi-tokei` is a node binding built with `tokei`, helping you count your code quickly.

## Install

Choose your preferred package manager.

```

# NPM
$ npm install @faga/tokei

# YARN
$ yarn add @faga/tokei

# PNPM
$ pnpm install @faga/tokei

```

## Examples

```ts
import tokei from '@faga/tokei'
import process from 'process'

const include = [process.cwd()]

const exclude = ['node_modules']

console.log(tokei({ include, exclude, languages: ['TypeScript'] }))
```
