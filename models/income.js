// Creating our Income model
module.exports = function(sequelize, DataTypes) {
  var Income = sequelize.define(
    "Income",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        validate: {
          len: [1, 10]
        }
      }
    },
    {
      timestamps: false
    }
  );

  Income.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Income.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Income.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Income;
};
