'use strict'
const express = require('express')
const router = express.Router()

const {
	index,
	create,
	show,
	update,
	destroy,
	indexHistory,
	showToday,
	showByDate
} = require('../controllers/boxController')

router.route('/boxes')
	.get(index)
	.post(create)

router.route('/boxes/:id')
	.get(show)
	.put(update)
	.delete(destroy)

router.route('/boxes-history')
	.get(indexHistory)

router.get('/boxes-history/today', showToday)

router.get('/boxes-history/date/:date', showByDate)

module.exports = router
