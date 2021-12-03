// merchant middleware
const {verifyAccessToken} = require('../../utils/jwt')

function auth(req, res, next){
    try{
        if(!req.headers['authorization']) throw new Error('Unauthorized User')

        let token = req.headers['authorization']
        token = token.replace(/['"]+/g, '')
        let tokenValid = verifyAccessToken(token)
        if(tokenValid){
            req.payload = tokenValid
            next()
        } 
        else throw new Error('Unauthorized User')

    } catch(err){
        next(err)
    }

}

module.exports = auth