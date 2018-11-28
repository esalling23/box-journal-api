'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const BoxSchema = new Schema({
  title: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Box = mongoose.model('Box', BoxSchema)

module.exports = Box
