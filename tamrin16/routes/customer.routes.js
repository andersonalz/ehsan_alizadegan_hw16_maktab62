const express = require('express');
const router = express.Router();

module.exports = function({ connection }) {
  const controller = require('../controllers/customer.controller')(connection);
  const middleware = require('../middlewares/customer.middleware');

  router.get('/', controller.readAll);
  router.get('/:id', controller.readOne);
  router.post('/create', middleware.checkInputs, controller.create);
  router.put('/update/:id', middleware.checkInputs, controller.update);
  router.delete('/delete/:id', controller.delete);

  return router;
}