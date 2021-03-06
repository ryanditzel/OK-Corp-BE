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
        foreignKey: "companyId",
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
      tableName: "companies",
    }
  );
  return Company;
};
