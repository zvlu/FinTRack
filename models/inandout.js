module.exports = function(sequelize, DataTypes) {
  var InAndOut = sequelize.define(
    "InAndOut",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          len: [1, 10]
        }
      },
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

  return InAndOut;
};
