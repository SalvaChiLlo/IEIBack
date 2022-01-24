module.exports = {
  // Server IP
  ip: process.env.PRODUCTION_IP || process.env.IP || undefined,

  // Server port
  port: process.env.PRODUCTION_PORT || process.env.PORT || 9000,

  sequelize:
  {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_DB_HOST,
    dialect: process.env.PRODUCTION_DIALECT,
    // ssl: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
