'use strict'
const express = require('express')
const router = express.Router()

const {
	index,
	create,
	show,
	update,
	destroy
} = require('../controllers/trackerController')

router.route('/trackers')
	.get(index)
	.post(create)

router.route('/trackers/:id')
	.get(show)
	.put(update)
	.delete(destroy)

module.exports = router
