'use strict'

module.exports = function(app) {
  const controller = require('../controllers/userTrackerController')

  app.route('/user/trackers')
    .get(controller.index)
    .post(controller.create)

  app.route('/user/trackers/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy)
}
