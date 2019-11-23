'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('datadir', 
      [{
        name: 'khai',
        age: 22
      },
      {
        name: 'unaa',
        age: 22
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkDelete('datadir', null, {});
    
  }
};
