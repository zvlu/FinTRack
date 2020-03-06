// Creating our Income model
module.exports = function(sequelize, DataTypes) {
  var Income = sequelize.define("Income", {
    fullTimeJob: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    },
    partTimeJob: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    },
    extraIncome: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    }
  });
  Income.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Income.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Income;
};
