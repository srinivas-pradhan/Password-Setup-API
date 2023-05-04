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
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
      },
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('SecretStore', SecretSchema)
  
