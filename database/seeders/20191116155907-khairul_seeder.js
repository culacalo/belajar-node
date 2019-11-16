'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('khairul', [
    {
      name: 'Khairul Bahri',
      age: 11
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('khairul', null, {});
  }
};
