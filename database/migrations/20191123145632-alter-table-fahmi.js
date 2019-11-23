'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'fahmi',
          'is_deleted',
          {
            type: Sequelize.INTEGER(11),
            after:'age',
            defaultValue:0
          },
          {transaction: t}
        )
      ])
      .then(() => {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('fahmi', 'is_deleted', {transaction: t})
      ])
      .then(() => {})
    })
  }
};
