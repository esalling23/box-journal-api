'use strict'

const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
		validate: [ isEmail, 'invalid email' ],
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

const User = model('User', UserSchema)

module.exports = User
