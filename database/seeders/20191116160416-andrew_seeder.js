'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('andrew',[
        {
          name: 'andrew',
          age: 26
        },
        {
          name: 'marselino',
          age: 25
        }
      ], {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('andrew', null, {});
    }
  };

