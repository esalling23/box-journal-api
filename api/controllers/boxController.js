'use strict'

const { model } = require('mongoose');
const { endOfDay, startOfDay } = require('date-fns')
const moment = require('moment')

const { handle404 } = require('../../lib/custom_errors')

const Box = model('Box')

// INDEX
// GET /boxes
const index = (req, res, next) => {
  Box.find()
    .then(boxes => {
      return boxes.map(box => box.toObject())
    })
    .then(boxes => res.status(200).json({ boxes }))
    .catch(next)
}

// SHOW
// GET /boxes/5a7db6c74d55bc51bdf39793
const show = (req, res, next) => {
  Box.findById(req.params.id)
    .then(handle404)
    .then(box => res.status(200).json({ box: box.toObject() }))
    .catch(next)
}

// CREATE
// POST /boxes
const create = (req, res, next) => {
  // set owner of new box to be current user
  req.body.box.owner = req.user.id

  Box.create(req.body.box)
    .then(box => {
      res.status(201).json({ box: box.toObject() })
    })
    .catch(next)
}

// UPDATE
// PATCH /boxes/5a7db6c74d55bc51bdf39793
const update = (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.box.owner

  Box.findById(req.params.id)
    .then(handle404)
    .then(box => {
      requireOwnership(req, box)

      return box.update(req.body.box)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

// DESTROY
// DELETE /boxes/5a7db6c74d55bc51bdf39793
const destroy = (req, res, next) => {
  Box.findById(req.params.id)
    .then(handle404)
    .then(box => {
      requireOwnership(req, box)
      box.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}


const showByDate = function (req, res, next) {
	const date = req.params.date;
	Box.findOne({ createdAt: date })
		.then(handle404)
		.then(box => res.status(200).send(box))
		.catch(next)
}

const showToday = function (req, res, next) {
	const start = moment().startOf('day').toDate()
	const end = moment().startOf('day').add(1, 'days').toDate()
	console.log(start, end)

	Box.findOne({ 
		createdAt: {
			$gte: start,
			$lt: end
		} 
	})
	.then(box => {
		console.log(box)
		if (!box) {
			res.status(201)
			return Box.create({})
		}
		res.status(200)
		return box
	})
	.then((box) => res.send(box))
	.catch(next)
}

const indexHistory = function (req, res, next) {
	Box.find({
		createdAt: {
			$lte: moment().startOf('day')
		}
	})
	.then(boxes => res.status(200).send({ boxes }))
	.catch(next)
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
	showByDate,
	showToday,
	indexHistory,
}
