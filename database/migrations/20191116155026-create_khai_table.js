'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
     
      return queryInterface.createTable('datadir', 
      { 
        id: {
         type: Sequelize.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
        },
        name: Sequelize.STRING(255),
        age: Sequelize.STRING(3)
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('datadir');
  }
};
