const tokei = require('@faga/tokei').default

console.log(tokei({ include: [process.cwd()], exclude: [] }))
