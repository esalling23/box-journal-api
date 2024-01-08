'use strict'

const { model } = require('mongoose');

const UserTracker = model('UserTracker')

// Get ALL userTrackers
const index = function(req, res) {
  UserTracker.find({}, (err, userTrackers) => {
    if (err) res.send(err)

    res.send(userTrackers)
  })
}

// Get ONE userTracker
const show = function(req, res) {
  UserTracker.findById(req.params.id, (err, userTracker) => {
    if (err) res.send(err)

    res.send(userTracker)
  })
}

// Create userTracker
const create = function(req, res) {
  console.log('creating new userTracker')
  const newuserTracker = new UserTracker(req.body)
  newuserTracker.save((err, userTracker) => {
    console.log(err, userTracker)
    if (err) res.send(err)

    res.send(userTracker)
  })
}

// Update userTracker
const update = function(req, res) {
  UserTracker.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  { new: true },
  (err, userTracker) => {
    if (err) res.send(err)

    res.send(userTracker)
  })
}

// Delete userTracker
const destroy = function(req, res) {
  UserTracker.remove({
    _id: req.params.id
  },
  (err, userTracker) => {
    if (err) res.send(err)

    res.send(userTracker)
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
