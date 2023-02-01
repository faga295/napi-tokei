# napi-tokei
`napi-tokei` is a npm package build with Rust, helping you count your code quickly.

If you want to run the binary file, you can see [tokei](https://github.com/XAMPPRocky/tokei), `napi-tokei` is exactly made of it.

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
import path from 'path'

import { tokei } from '@faga/tokei'

// path need to be included, please use absolute path
const include = [path.resolve(__dirname, '../../')]

// Exclude any path that contains any of these strings.
const exclude = ['packages']

console.log(tokei(include, exclude))
```
![](https://lzc-personal-resource.oss-cn-beijing.aliyuncs.com/20230126164310.png)