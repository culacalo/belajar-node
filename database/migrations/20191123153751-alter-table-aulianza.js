'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'aulianza',  //initial database table
          'is_deleted', //new column inserted
          {
            type: Sequelize.INTEGER(1), //column type
            after: 'age', //insert after this column
            defaultValue: 0 //default value for this column
          },
          { 
            transaction: t 
          }
        )
      ])
      .then(() => {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('aulianza', 'is_deleted', 
        { 
          transaction: t 
        })
      ])
    })
  }
};
