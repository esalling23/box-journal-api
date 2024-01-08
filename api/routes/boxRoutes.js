'use strict'

module.exports = function(app) {
  const controller = require('../controllers/boxController')

  app.route('/boxes')
    .get(controller.index)
    .post(controller.create)

  app.route('/boxes/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy)

	app.route('/boxes-history')
		.get(controller.indexHistory)

	app.route('/boxes-history/today')
		.get(controller.showToday)

	app.route('/boxes-history/date/:date')
		.get(controller.showByDate)
}
