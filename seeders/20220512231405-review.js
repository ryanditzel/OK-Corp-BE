"use strict";
const { User, sequelize } = require("../models");
const falso = require("@ngneat/falso");
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = await Promise.all(
      [...Array(10)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true });
        return {
          title: falso.randCatchPhrase({ maxlength: 10 }),
          jobTitle: falso.randJobTitle,
          body: falso.randSentence({ maxlength: 30 }),
          helpful: falso.randNumber({ min: 0, max: 300 }),
          unhelpful: falso.randNumber({ min: 0, max: 300 }),
        };
      })
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete();
  },
};
