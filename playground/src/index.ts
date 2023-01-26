import path from 'path'

import { tokei } from 'napi-tokei'

// path need to be included, please use absolute path
const include = [path.resolve(__dirname, '../../')]

// Exclude any path that contains any of these strings.
const exclude = ['packages']

console.log(tokei(include, exclude)) // [{ lang: 'JavaScript', lines: 238, code: 228, comments: 1, blanks: 9 }]
