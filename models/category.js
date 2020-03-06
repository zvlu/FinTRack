// Creating our Income model
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
  //   Category.associate = function(models) {
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line indent
  //     Category.hasMany(models.Income, {
  //       onDelete: "cascade"
  //     });
  //   };
  return Category;
};
