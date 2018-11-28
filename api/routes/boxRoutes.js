'use strict'

module.exports = function(app) {
  const box = require('../controllers/boxController.js')

  app.route('/boxes')
    .get(box.index)

  app.route('/box')
    .post(box.create)

  app.route('/box/:id')
    .get(box.show)
    .put(box.update)
    .delete(box.delete)

}
