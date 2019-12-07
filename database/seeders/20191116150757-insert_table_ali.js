'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('AliTable', [
        {
          name: 'ali',
          age: 24
        },
        {
          name: 'snf',
          age: 404
        }
      ], {});
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('AliTable', null, {});
  }
};
