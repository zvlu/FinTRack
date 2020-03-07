// Creating the Bank model
module.exports = function(sequelize, DataTypes) {
  var Bank = sequelize.define(
    "Bank",
    {
      currentBalance: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Bank.associate = function(models) {
    Bank.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Bank;
};
