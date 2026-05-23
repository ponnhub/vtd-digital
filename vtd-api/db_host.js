// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
	host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  // pool.getConnection()
  //   .then(conn => {
  //     console.log("connected ! connection id is " + conn.threadId);
  //     conn.release(); //release to pool
  //   })
  //   .catch(err => {
  //     console.log("not connected due to error: " + err);
  //   });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});