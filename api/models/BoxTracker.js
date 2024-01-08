'use strict'

const { Schema, model, ObjectId } = require('mongoose');
const UserTracker = require('./UserTracker');

const TRACKER_SIZE = {
	SMALL: 'SMALL',
	MED_LONG: 'MED_LONG',
	MED_TALL: 'MED_TALL',
	LARGE: 'LARGE'
}

const BOX_TRACKER_CONTENT = {
	TEXT: 'TEXT',
	IMAGE: 'IMAGE',
	VIDEO: 'VIDEO',
	VOICE_MEMO: 'VOICE_MEMO'
}

const BoxTrackerContent = new Schema({
	type: {
		type: String, // should be the content URL if not a text type
		default: BOX_TRACKER_CONTENT.TEXT,
	},
	value: {
		type: String
	}
})

const BoxTrackerSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
	tracker: { 
		type: ObjectId,
		ref: UserTracker,
		required: true 
	},
	content: BoxTrackerContent,
	size: {
		type: String,
		default: TRACKER_SIZE[0],
		required: true
	},
	position: Number
}, {
  timestamps: true
})

const BoxTracker = model('BoxTracker', BoxTrackerSchema)

module.exports = BoxTracker
