'use strict'

const { model } = require('mongoose');

const Tracker = model('Tracker')

// Get ALL habits
const index = function(req, res) {
  Tracker.find({}, (err, habits) => {
    if (err) res.send(err)

    res.send(habits)
  })
}

// Get ONE tracker
const show = function(req, res) {
  Tracker.findById(req.params.id, (err, tracker) => {
    if (err) res.send(err)

    res.send(tracker)
  })
}

// Create tracker
const create = function(req, res) {
  console.log('creating new tracker')
  const newhabit = new Tracker(req.body)
  newhabit.save((err, tracker) => {
    console.log(err, tracker)
    if (err) res.send(err)

    res.send(tracker)
  })
}

// Update tracker
const update = function(req, res) {
  Tracker.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  { new: true },
  (err, tracker) => {
    if (err) res.send(err)

    res.send(tracker)
  })
}

// Delete tracker
const destroy = function(req, res) {
  Tracker.remove({
    _id: req.params.id
  },
  (err, tracker) => {
    if (err) res.send(err)

    res.send(tracker)
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
