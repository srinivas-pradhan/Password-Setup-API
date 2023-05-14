const  jwt_decode = require("jwt-decode")
 

const decode = async (token) => {
    try {
        const decoded = jwt_decode(token)
        return response
    } catch (error) {
        return error.name
    }
}

//console.log(decoded['cognito:groups'])

module.exports = decode
