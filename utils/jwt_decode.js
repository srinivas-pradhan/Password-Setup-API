const  jwt_decode = require("jwt-decode")
 

const decode = async (token) => {
    try {
        const decoded = jwt_decode(token)
        return decoded
    } catch (error) {
        return error.name
    }
}

module.exports = decode
