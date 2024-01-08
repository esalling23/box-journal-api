'use strict'

module.exports = function(app) {
  const controller = require('../controllers/trackerController')

  app.route('/trackers')
    .get(controller.index)
    .post(controller.create)

  app.route('/trackers/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy)
}
