import tokei from '@faga/tokei'
import process from 'process'

const include = [process.cwd()]

const exclude = ['node_modules']

console.log(tokei({ include, exclude, languages: ['TypeScript'] }))