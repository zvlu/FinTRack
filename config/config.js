var config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    alpApiUrl: process.env.ALP_API_URL,
    alpApiKey: process.env.ALP_API_KEY,
    finApiKey: process.env.FINHUB_API_KEY,
    finApiUrl: process.env.FINHUB_API_URL
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
module.exports = config;
