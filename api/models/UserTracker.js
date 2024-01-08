'use strict'

const { Schema, model, ObjectId } = require('mongoose');
const Tracker = require('./Tracker');
// const Tracker = require('./Tracker');

const TrackerTypes = {
  Main: 'Main', // main box
  Side: 'Side' // sidebar position
}

const UserTrackerSchema = new Schema({
  active: {
    type: Boolean
  },
	Tracker: { 
		type: ObjectId,
		ref: Tracker,
		required: true 
	}
}, {
  timestamps: true
})

const UserTracker = model('UserTracker', UserTrackerSchema)

module.exports = UserTracker
