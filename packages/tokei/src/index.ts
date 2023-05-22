import { tokei as tokeiCore, TokeiOptions,LanguageInfo  } from '@faga/tokei-core'

export * from '@faga/tokei-core'


const transformInfo = (infos:Array<LanguageInfo>) => {
    const res:Record<string, Omit<LanguageInfo, 'lang'>> = {};
    const total:Omit<LanguageInfo, 'lang'> = {
        code: 0,
        comments: 0,
        blanks: 0,
        lines: 0
    }
    res.Total = total;
    infos.forEach(info => {
        res[info.lang] = info
        // @ts-ignore
        delete info.lang;
        total.code += info.code;
        total.comments += info.comments;
        total.blanks += info.blanks;
        total.lines += info.lines;
    })
    return res
}

export default (options: TokeiOptions = {}) => transformInfo(tokeiCore(options))
