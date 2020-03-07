module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define(
    "Portfolio",
    {
      portfolioVal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Portfolio.associate = function(models) {
    Portfolio.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Portfolio;
};
