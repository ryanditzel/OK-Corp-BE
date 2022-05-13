"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Review, {
        foreignKey: "company_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
        Company.hasMany(models.User, {
          foreignKey: "user_id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }
  Company.init(
    {
      companyName: DataTypes.STRING,
      location: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "Companies",
    }
  );
  return Company;
};
