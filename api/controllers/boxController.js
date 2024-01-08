'use strict'

const { model } = require('mongoose');
const { endOfDay, startOfDay } = require('date-fns')
const moment = require('moment')

const Box = model('Box')

// INDEX
// GET /boxes
const index = (req, res, next) => {
  Box.find()
    .then(boxes => {
      // `boxes` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return boxes.map(box => box.toObject())
    })
    // respond with status 200 and JSON of the boxes
    .then(boxes => res.status(200).json({ boxes }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// SHOW
// GET /boxes/5a7db6c74d55bc51bdf39793
const show = (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Box.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "box" JSON
    .then(box => res.status(200).json({ box: box.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// CREATE
// POST /boxes
const create = (req, res, next) => {
  // set owner of new box to be current user
  req.body.box.owner = req.user.id

  Box.create(req.body.box)
    // respond to succesful `create` with status 201 and JSON of new "box"
    .then(box => {
      res.status(201).json({ box: box.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
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
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, box)

      // pass the result of Mongoose's `.update` to the next `.then`
      return box.update(req.body.box)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// DESTROY
// DELETE /boxes/5a7db6c74d55bc51bdf39793
const destroy = (req, res, next) => {
  Box.findById(req.params.id)
    .then(handle404)
    .then(box => {
      // throw an error if current user doesn't own `box`
      requireOwnership(req, box)
      // delete the box ONLY IF the above didn't throw
      box.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}


const showByDate = function (req, res) {
	const date = req.params.date;
	Box.findOne({ createdAt: date }, (err, box) => {
		if (err) res.send(err)

		res.send(box)
	})
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
	.then(res.send)
	.catch(next)
}

const indexHistory = function (req, res, next) {
	const date = Date.now()
	Box.find({
		createdAt: {
			$lte: startOfDay(date)
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
