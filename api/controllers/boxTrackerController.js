'use strict'

const { model } = require('mongoose');

const BoxTracker = model('BoxTracker')

// INDEX
// GET /boxTrackers
const index = (req, res, next) => {
  BoxTracker.find()
    .then(boxTrackers => {
      // `boxTrackers` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return boxTrackers.map(boxTracker => boxTracker.toObject())
    })
    // respond with status 200 and JSON of the boxTrackers
    .then(boxTrackers => res.status(200).json({ boxTrackers }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// SHOW
// GET /boxTrackers/5a7db6c74d55bc51bdf39793
const show = (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  BoxTracker.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "boxTracker" JSON
    .then(boxTracker => res.status(200).json({ boxTracker: boxTracker.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// CREATE
// POST /boxTrackers
const create = (req, res, next) => {
  // set owner of new boxTracker to be current user
  req.body.boxTracker.owner = req.user.id

  BoxTracker.create(req.body.boxTracker)
    // respond to succesful `create` with status 201 and JSON of new "boxTracker"
    .then(boxTracker => {
      res.status(201).json({ boxTracker: boxTracker.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
}

// UPDATE
// PATCH /boxTrackers/5a7db6c74d55bc51bdf39793
const update = (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.boxTracker.owner

  BoxTracker.findById(req.params.id)
    .then(handle404)
    .then(boxTracker => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, boxTracker)

      // pass the result of Mongoose's `.update` to the next `.then`
      return boxTracker.update(req.body.boxTracker)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// DESTROY
// DELETE /boxTrackers/5a7db6c74d55bc51bdf39793
const destroy = (req, res, next) => {
  BoxTracker.findById(req.params.id)
    .then(handle404)
    .then(boxTracker => {
      // throw an error if current user doesn't own `boxTracker`
      requireOwnership(req, boxTracker)
      // delete the boxTracker ONLY IF the above didn't throw
      boxTracker.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}


module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
