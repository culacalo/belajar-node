"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "aulianza",
      [
        {
          name: 'aulianza',
          age: 17
        },
        {
          name: 'ryan',
          age: 16
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("aulianza", null, {});
  }
};
