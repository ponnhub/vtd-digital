// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host: "127.0.0.1", 
    port: 3306,
    user: "app_user", 
    password: "Password123!",
    ssl: {
    rejectUnauthorized: false
    }, 
    database: "todo"
  });

    // Ping database to check for common exception errors.
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }

    if (connection) connection.release()

    return
  })

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