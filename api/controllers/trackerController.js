'use strict'

const { model } = require('mongoose');

const Tracker = model('Tracker')

// INDEX
// GET /trackers
const index = (req, res, next) => {
  Tracker.find()
    .then(trackers => {
      return trackers.map(tracker => tracker.toObject())
    })
    .then(trackers => res.status(200).json({ trackers }))
    .catch(next)
}

// SHOW
// GET /trackers/5a7db6c74d55bc51bdf39793
const show = (req, res, next) => {
  Tracker.findById(req.params.id)
    .then(handle404)
    .then(tracker => res.status(200).json({ tracker: tracker.toObject() }))
    .catch(next)
}

// CREATE
// POST /trackers
const create = (req, res, next) => {
  // set owner of new tracker to be current user
  req.body.tracker.owner = req.user?.id

  Tracker.create(req.body.tracker)
    .then(tracker => {
      res.status(201).json({ tracker: tracker.toObject() })
    })
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
      requireOwnership(req, tracker)
      return tracker.update(req.body.tracker)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

// DESTROY
// DELETE /trackers/5a7db6c74d55bc51bdf39793
const destroy = (req, res, next) => {
  Tracker.findById(req.params.id)
    .then(handle404)
    .then(tracker => {
      requireOwnership(req, tracker)
      tracker.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}


module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
