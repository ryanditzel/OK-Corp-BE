"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
        Review.belongsTo(models.Company, {
          foreignKey: "companyId",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }
  Review.init(
    {
      title: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      body: DataTypes.TEXT,
      helpful: DataTypes.INTEGER,
      unhelpful: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
    }
  );
  return Review;
};
