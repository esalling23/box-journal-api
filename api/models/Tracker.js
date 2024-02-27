'use strict'

const { Schema, model } = require('mongoose')
const User = require('./User')

const TrackerTypes = {
  Counter: 'Counter', // count 1 action a given # of times
  Tracker: 'Tracker', // track different actions throughout the day
	Memory: 'Memory', // track text, video, or photo content
}

// A Tracker is a thing to track for each day
const TrackerSchema = new Schema({
  name: {
    type: String,
		required: true
  },
	type: {
		type: String,
    default: TrackerTypes[0],
		validate: val => {
			return Object.values(TrackerTypes).includes(val)
		},
		required: true
  },
	// Should be a single icon for "Counter" type, or multiple icons for "Tracker" type
	icons: {
		type: String,
		default: ''
	},
  isTemplate: {
		type: Boolean,
		default: false,
	},
  isPublic: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: User,
	}
}, {
  timestamps: true
})

const Tracker = model('Tracker', TrackerSchema)

module.exports = Tracker
