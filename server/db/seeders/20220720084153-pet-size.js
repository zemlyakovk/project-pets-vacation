module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Pet_sizes', [{
      title: 'Щенок',
      desc: '(до 1 года)',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Взрослый',
      desc: '(от 1 года до 7 лет)',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Старый',
      desc: '(от 7 лет)',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
