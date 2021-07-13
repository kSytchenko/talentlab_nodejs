module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'user',
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};