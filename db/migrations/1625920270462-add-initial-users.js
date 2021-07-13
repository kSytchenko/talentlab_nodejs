module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '00000000-0000-0000-0000-000000000001',
        username: 'admin',
        password: 'admin',
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        username: 'user',
        password: 'user',
      }
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};