# napi-tokei
`napi-tokei` is a npm package build with Rust, helping you count your code quickly.

If you want to run the binary file, you can see [tokei](https://github.com/XAMPPRocky/tokei), `napi-tokei` is exactly made of it.

## Install
Choose your preferred package manager.
```

# NPM
$ npm install napi-tokei

# YARN
$ yarn add napi-tokei

# PNPM
$ pnpm install napi-tokei

```

## Examples
```ts
import path from 'path'

import { tokei } from 'napi-tokei'

// path need to be included, please use absolute path
const include = [path.resolve(__dirname, '../../')]

// Exclude any path that contains any of these strings.
const exclude = ['packages']

tokei(include, exclude) // [{ lang: 'JavaScript', lines: 238, code: 228, comments: 1, blanks: 9 }]

```