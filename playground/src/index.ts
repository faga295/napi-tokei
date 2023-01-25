import path from 'path'

import { tokei } from '../../index'

console.log(tokei([path.resolve(__dirname, '../../')], ['benchmark']))
