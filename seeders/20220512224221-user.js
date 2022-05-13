"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        firstName: "Jeremy",
        lastName: "Taubman",
        userName: "JTaubman",
        email: "JT@email.com",
        password: "password",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
