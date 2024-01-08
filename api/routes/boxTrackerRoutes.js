'use strict'

module.exports = function(app) {
  const controller = require('../controllers/boxTrackerController')

  app.route('/boxTrackers')
    .get(controller.index)
    .post(controller.create)

  app.route('/boxTrackers/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy)

}
