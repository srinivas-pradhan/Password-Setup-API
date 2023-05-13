const  jwt_decode = require("jwt-decode")
 
var token = "";
var decoded = jwt_decode(token);

//console.log(decoded['cognito:groups'])

module.exports = decoded
