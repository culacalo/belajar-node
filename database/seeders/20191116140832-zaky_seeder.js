'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          name: 'zaky',
          age: 17,
          email: 'zaky@gmail.com',
          password: '1234'
        },
        {
          name: 'andrew',
          age: 62,
          email: 'saidandrew@gmail.com',
          password: 'wakyedforever'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
