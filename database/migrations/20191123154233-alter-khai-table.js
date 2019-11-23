'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'datadir',
          'is_deleted',
          {
            type: Sequelize.INTEGER(1),
            after: 'age',
            defaultValue: 0
          },
          { transaction: t}
        )
      ])
      .then(() => {})
    })
  },
      
    
  

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('datadir', 'is_deleted', {transaction: t})
      ]);
    });
  }
};
