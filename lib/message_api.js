'use strict'
const Message = require('../app/models/message')

const editable = (requestObject, items) => {
  return items.map(resource => {
    resource.editable = requestObject.user._id.equals(resource.owner)
    return resource
  })
}

const index = (req) => {
  return Message.find()
    .populate('owner')
    .sort({ 'createdAt': -1 })
    .then(messages => {
      // `messages` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      const messageObjects = messages.map(resource => resource.toObject())
      // now that they're objects we can compare the ownership
      // if the owner is the same as this user, `editable` will be true
      return messageObjects.map(message => {
        message.editable = req.user._id.equals(message.owner._id)
        return message
      })
    })
}

module.exports = {
  editable,
  index
}
