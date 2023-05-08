const mongoose = require('mongoose')

const SecretSchema = new mongoose.Schema(
    {
      secretName: {
        type: String,
        required: [true, 'Please provide a secret name'],
        maxlength: 50,
      },
      SecretString: {
        type: String,
        required: [true, 'Please provide a password'],
        maxlength: 100,
      },
      SSMUploadAccount: {
        type: String,
        enum: ['default', 'prod', 'stg'],
        default: 'default',
      },
      createdBy: {
        type: String,
        required: [true, 'Please provide username']
      },
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('SecretStore', SecretSchema)
  
