module.exports = function(sequelize, DataTypes) {
  var InAndOut = sequelize.define(
    "InAndOut",
    {
      // The email cannot be null, and must be a proper email before creation
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          len: [1, 10]
        }
      },
      // The password cannot be null
      amount: {
        type: DataTypes.DECIMAL,
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
  InAndOut.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    InAndOut.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    InAndOut.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  return InAndOut;
};
