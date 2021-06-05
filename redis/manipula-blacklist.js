const blacklist = require('./blacklist')

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    adiciona: async token => {
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await blacklist.set(tokenHash, '')
        blacklist.expireat(tokenHash, dataExpiracao)
    },
    contemToken: async token => {
        const tokenHash = geraTokenHash(token)
        const resultado = await blacklist.exists(tokenHash)
        return resultado === 1
    }
}