'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('farhan', [
        {
          name: 'Farhan Ramadhana',
          age: 22
        },
        {
          name: 'John Doe',
          age: 100
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('farhan', null, {});
  }
};
