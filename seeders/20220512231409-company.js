"use strict";
const falso = require("@ngneat/falso");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("companies", [
      {
        companyName: "Facepage",
        location: "Menlo Park, CA",
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies");
  },
};
