'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('AliTable', [
        {
          name: 'Sayed Khaidir Ali',
          age: 24
        },
        {
          name: 'Ihsan Error 404',
          age: 404
        }
      ], {});
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('AliTable', null, {});
  }
};
