import { tokei as tokeiCore, TokeiOptions } from '@faga/tokei-core'

export * from '@faga/tokei-core'

export default (options: TokeiOptions = {}) => tokeiCore(options)
