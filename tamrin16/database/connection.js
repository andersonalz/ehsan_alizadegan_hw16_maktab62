async function MakeConnection() {
    try {
      const mysql = require('mysql2/promise');
  
      // create the connection to database
      const connection = await mysql.createConnection({
        host: "localhost",
        database : "company2",
        user: "root",
        password:"1234"
      });
      return connection;
    } catch(err) {
      console.log(err);
      process.exit(1);
    }
  }
  
  module.exports = MakeConnection;