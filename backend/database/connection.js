const { createConnection } = require("mysql2/promise");

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

  const conn = await createConnection(config);
  return conn;
};

module.exports = { openConnection };
