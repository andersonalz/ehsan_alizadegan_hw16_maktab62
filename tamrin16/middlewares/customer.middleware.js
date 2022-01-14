function checkInputs(req, res, next) {
    if(!req.body.type) {
      return res.status(406).send({ success: false, message: 'type field is required.' });
    }
    if(!req.body.name) {
      return res.status(406).send({ success: false, message: 'name field is required.' });
    }
    if(!req.body.phone) {
      return res.status(406).send({ success: false, message: 'phone field is required.' });
    }
    next()
  }
  
  module.exports = {
    checkInputs
  };