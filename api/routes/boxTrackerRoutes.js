'use strict'
const express = require('express')
const router = express.Router()

const {
	index,
	create,
	show,
	update,
	destroy
} = require('../controllers/boxTrackerController')

router.route('/boxTrackers')
	.get(index)
	.post(create)

router.route('/boxTrackers/:id')
	.get(show)
	.put(update)
	.delete(destroy)

module.exports = router
