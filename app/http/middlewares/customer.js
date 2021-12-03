// customer middleware
const {verifyAccessToekn} = require('../../utils/jwt')

function auth(req, res, next){
    try{

        if(!req.headers['Authorization']) throw new Error('Unauthorized User')

        const token = req.headers['Authorization']

        let tokenValid = verifyAccessToekn(token)
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