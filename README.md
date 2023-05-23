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
const tokei = require('@faga/tokei').default

console.log(tokei({ include: [process.cwd()], exclude: [], languages: ['JavaScript'] }))
```
