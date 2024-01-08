'use strict'

const { model } = require('mongoose');

const BoxTracker = model('BoxTracker')

// Get ALL boxHabits
const index = function(req, res) {
  BoxTracker.find({}, (err, boxTracker) => {
    if (err) res.send(err)

    res.send(boxTracker)
  })
}

// Get ONE boxTracker
const show = function(req, res) {
  BoxTracker.findById(req.params.id, (err, boxTracker) => {
    if (err) res.send(err)

    res.send(boxTracker)
  })
}

// Create boxTracker
const create = function(req, res) {
  console.log('creating new boxTracker')
  const newhabit = new BoxTracker(req.body)
  newhabit.save((err, boxTracker) => {
    console.log(err, boxTracker)
    if (err) res.send(err)

    res.send(boxTracker)
  })
}

// Update boxTracker
const update = function(req, res) {
  BoxTracker.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  { new: true },
  (err, boxTracker) => {
    if (err) res.send(err)

    res.send(boxTracker)
  })
}

// Delete boxTracker
const destroy = function(req, res) {
  BoxTracker.remove({
    _id: req.params.id
  },
  (err, boxTracker) => {
    if (err) res.send(err)

    res.send(boxTracker)
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
