module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_to_role', [
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        role_id: 1,
      },
      {
        user_id: '00000000-0000-0000-0000-000000000002',
        role_id: 2,
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_to_role', null, {});
  }
};