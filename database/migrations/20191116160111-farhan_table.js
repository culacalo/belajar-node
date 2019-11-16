'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('farhan', 
      { id: {
          type: Sequelize.INTEGER(11),
          primaryKey: true,
          autoIncrement: true
      },
      name: Sequelize.STRING(225),
      age: Sequelize.INTEGER(3)  
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
