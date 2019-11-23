'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.addColumn(
            'farhan',
            'is_deleted',
            {
              type: Sequelize.INTEGER(1),
              after: 'age',
              defaultValue: 0 
            },
            { transaction: t }
          )
        ])
        .then(() => {})
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.removeColumn('farhan', 'is_deleted', { transaction: t })
        ]);
      });
  }
};
