module.exports = function({connection}) {
    const model = require('../models/customer.model')(connection);
  
    return {
      readAll: async function(req, res) {
        try {
          const customers = await model.findAll();
          if(!customers.length) {
            return res.send({
              success: false,
              message: 'there is no customers yet.'
            });
          }
    
          return res.send({
            success: true,
            message: 'list of customers fetched successfully.',
            data: customers
          });
  
        } catch(err) {
          console.log(err);
          return res.status(500).send({ success: false, message: 'Internal server error.' });
        }
      },
      readOne: async function(req, res) {
        try {
          const customer = await model.findById(Number(req.params.id));
          if(!customer.length) {
            return res.send({
              success: false,
              message: `there is no customer with id: ${req.params.id}.`
            });
          }
    
          return res.send({
            success: true,
            message: `customer with id: ${req.params.id} fetched successfully.`,
            data: customer[0]
          });
  
        } catch(err) {
          console.log(err);
          return res.status(500).send({ success: false, message: 'Internal server error.' });
        }
      },
      create: async function(req, res) {
        try {
          const  created = await model.create(req.body);
          return res.send({
            success: true,
            message: 'customer created successfully.',
            id: created.insertId
          });
  
        } catch(err) {
          console.log(err);
          return res.status(500).send({ success: false, message: 'Internal server error.' });
        }
      },
      update: async function(req, res) {
        try {
          const customer  = await model.findById(Number(req.params.id));
          if(!customer.length) {
            return res.send({
              success: false,
              message: `there is no customer with id: ${req.params.id}.`
            });
          }
  
          const  updated  = await model.update(Number(req.params.id), req.body);
          if(!updated.changedRows) {
            return res.send({
              success: false,
              message: `customer with id: ${req.params.id} has updated before.`
            });
          }
  
          return res.send({
            success: true,
            message: 'customer updated successfully.',
            id: Number(req.params.id)
          });
  
        } catch(err) {
          console.log(err);
          return res.status(500).send({ success: false, message: 'Internal server error.' });
        }
      },
      delete: async function(req, res) {
        try {
          const customer  = await model.findById(Number(req.params.id));
          if(!customer.length) {
            return res.send({
              success: false,
              message: `there is no customer with id: ${req.params.id}.`
            });
          }
  
          const  deleted =  await model.delete(Number(req.params.id));  
          return res.send({
            success: true,
            message: 'customer deleted successfully.',
            id: Number(req.params.id)
          });
  
        } catch(err) {
          console.log(err);
          return res.status(500).send({ success: false, message: 'Internal server error.' });
        }
      }
    }
  }