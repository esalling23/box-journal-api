'use strict'

const { model } = require('mongoose');

const Tracker = model('Tracker')

// INDEX
// GET /trackers
const index = (req, res, next) => {
  Tracker.find()
    .then(trackers => {
      // `trackers` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return trackers.map(tracker => tracker.toObject())
    })
    // respond with status 200 and JSON of the trackers
    .then(trackers => res.status(200).json({ trackers }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// SHOW
// GET /trackers/5a7db6c74d55bc51bdf39793
const show = (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Tracker.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "tracker" JSON
    .then(tracker => res.status(200).json({ tracker: tracker.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// CREATE
// POST /trackers
const create = (req, res, next) => {
  // set owner of new tracker to be current user
  req.body.tracker.owner = req.user.id

  Tracker.create(req.body.tracker)
    // respond to succesful `create` with status 201 and JSON of new "tracker"
    .then(tracker => {
      res.status(201).json({ tracker: tracker.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
}

// UPDATE
// PATCH /trackers/5a7db6c74d55bc51bdf39793
const update = (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.tracker.owner

  Tracker.findById(req.params.id)
    .then(handle404)
    .then(tracker => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, tracker)

      // pass the result of Mongoose's `.update` to the next `.then`
      return tracker.update(req.body.tracker)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
}

// DESTROY
// DELETE /trackers/5a7db6c74d55bc51bdf39793
const destroy = (req, res, next) => {
  Tracker.findById(req.params.id)
    .then(handle404)
    .then(tracker => {
      // throw an error if current user doesn't own `tracker`
      requireOwnership(req, tracker)
      // delete the tracker ONLY IF the above didn't throw
      tracker.remove()
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
