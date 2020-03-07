module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    // The email cannot be null, and must be a proper email before creation
    date: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    },
    // The password cannot be null
    expenseAmt: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    }
  });
  Expense.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Expense.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return Expense;
};
