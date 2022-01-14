const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('dotenv').config();
const makeConnection = require('./database/connection');

const managerRouter = require('./routes/manager.routes');
const customerRouter = require('./routes/customer.routes');
const projectRouter = require('./routes/project.routes');
const ticketRouter = require('./routes/ticket.routes');
const messageRouter = require('./routes/message.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

makeConnection().then(function(conn) {
  // app.use('/manager', managerRouter({ connection: conn }));
  app.use('/customer', customerRouter({ connection: conn }));
  // app.use('/project', projectRouter({ connection: conn }));
  // app.use('/ticket', ticketRouter({ connection: conn }));
  // app.use('/message', messageRouter({ connection: conn }));
})

app.listen(3000)
module.exports = app;


