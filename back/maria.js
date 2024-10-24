// mysql
const mariadb = require("mysql");

const connection = mariadb.createConnection({
  // host: "localhost",
  host: "10.100.100.200",
  port: 3306,
  user: "root",
  password: "pass",
  database: "uds",
});

module.exports = connection;
