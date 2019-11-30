'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'andrew',
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

  down: (queryInterface, Sequalize) => {
    return queryInterface.sequalize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('andrew', 'is_deleted', { transaction: t })
      ]);
    });
  }
};

