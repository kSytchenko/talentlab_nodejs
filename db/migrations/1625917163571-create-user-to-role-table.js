module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_to_role', {
      user_id: {
        type: Sequelize.UUID,
      },
      role_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_to_role');
  }
};