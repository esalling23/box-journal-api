'use strict'

const { Schema, model, ObjectId } = require('mongoose');
const BoxTracker = require('./BoxTracker');
const User = require('./User')

const BoxSchema = new Schema({
  intention: {
    type: String
  },
  memory: {
    type: String
  },
	trackers: [{
		type: ObjectId,
		ref: BoxTracker
	}],
	owner: {
		type: ObjectId,
		ref: User,
	}
}, {
  timestamps: true
})

const Box = model('Box', BoxSchema)

module.exports = Box
