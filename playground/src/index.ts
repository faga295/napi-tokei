import path from 'path'

import { tokei } from 'napi-tokei'

// path need to be included, please use absolute path
const include = ['./']

// Exclude any path that contains any of these strings.
const exclude = ['packages']

console.log(tokei(include, exclude))
