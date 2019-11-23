'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('fahmi', [
        {
        name: 'John Doe',
        age:22
      },
      {
        name: 'Fahmi Z',
        age:23
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('fahmi', null, {});
  }
};
