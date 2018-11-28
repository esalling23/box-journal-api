'use strict'

const mongoose = require('mongoose'),
      Box = mongoose.model('Box')

// Get ALL Boxes
const index = function(req, res) {
  Box.find({}, (err, boxes) => {
    if (err) res.send(err)

    res.send(boxes)
  })
}

// Get ONE Box
const show = function(req, res) {
  Box.findById(req.params.id, (err, box) => {
    if (err) res.send(err)

    res.send(box)
  })
}

// Create Box
const create = function(req, res) {
  console.log('creating new box')
  const newBox = new Box(req.body)
  newBox.save((err, box) => {
    console.log(err, box)
    if (err) res.send(err)

    res.send(box)
  })
}

// Update Box
const update = function(req, res) {
  Box.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  { new: true },
  (err, box) => {
    if (err) res.send(err)

    res.send(box)
  })
}

// Delete Box
const destroy = function(req, res) {
  Box.remove({
    _id: req.params.id
  },
  (err, box) => {
    if (err) res.send(err)

    res.send({ message: 'Box deleted'})
  })
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
