'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('culacalo_wan', [{
      name: 'Wanda Ichsanul Isra',
      age: 12
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('culacalo_wan', null, {});
  }
};
