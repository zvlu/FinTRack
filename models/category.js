// Creating our Category model
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define(
    "Category",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  return Category;
};
