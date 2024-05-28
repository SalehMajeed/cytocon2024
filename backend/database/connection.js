const pgp = require("pg-promise")();
// const { createConnection } = require("mysql2/promise");

const openConnection = async () => {
  const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  const cPanelConfig = {
    host: process.env.CPANEL_DB_HOST,
    user: process.env.CPANEL_DB_USER,
    password: process.env.CPANEL_DB_PASSWORD,
    database: process.env.CPANEL_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // const conn = await createConnection({connect});
  const conn = await pgp({ connectionString: process.env.POSTGRESQL });
  return conn;
};

module.exports = { openConnection };
