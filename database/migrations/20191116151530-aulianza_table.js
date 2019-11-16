'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('aulianza',
      { 
        id: {
          type: Sequelize.INTEGER(11),
          primaryKey: true,
          autoIncrement: true
        } ,
        name: Sequelize.STRING(225),
        age: Sequelize.INTEGER(3)
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('aulianza');
  }
};
