"use strict";
const falso = require("@ngneat/falso");
const user = require("../models/user");
const users = [...Array(10)].map(() => ({
  firstName: falso.randFirstName(),
  lastName: falso.randLastName(),
  userName: falso.randUserName(),
  email: falso.randEmail(),
  password: falso.randPassword(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
