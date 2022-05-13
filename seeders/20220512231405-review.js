"use strict";
const { User, sequelize } = require("../models");
const falso = require("@ngneat/falso");
const { user } = require("pg/lib/defaults");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("reviews", [
      {
        title: "Boil 'em, fry 'em, put 'em in a stew",
        jobTitle: "Potato Enthusiast",
        body: "I'm a potato",
        helpful: 77,
        unhelpful: 17,
        user_id: 1,
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("reviews");
  },
};
