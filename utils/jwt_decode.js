const  jwt_decode = require("jwt-decode")
 

const decode = async (token) => {
    try {
        const decoded = jwt_decode(token)
        return decoded['cognito:groups']
    } catch (error) {
        return null
    }
}

module.exports = decode
