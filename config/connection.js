var Sequelize = require("sequelize");

var sequelize = new Sequelize("expense_tracker", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql"
});

module.exports = sequelize;
