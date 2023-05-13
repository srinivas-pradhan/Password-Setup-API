const  jwt_decode = require("jwt-decode")
 

const decode = async (token) => {
    decoded = jwt_decode(token)
    return response
}

//console.log(decoded['cognito:groups'])

module.exports = decoded
