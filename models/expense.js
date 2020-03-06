module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    // The email cannot be null, and must be a proper email before creation
    rentOrMortgage: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        len: [1, 10]
      }
    },
    // The password cannot be null
    gas: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    electricity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    cable: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    foodAndGrocery: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    car: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    misc: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
  };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return Expense;
};
