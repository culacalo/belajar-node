"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ichsan",
      [
        {
          name: "Mulia Ichsan",
          age: 22
        },
        {
          name: "Bang Zaky",
          age: 40
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ichsan", null, {});
  }
};
