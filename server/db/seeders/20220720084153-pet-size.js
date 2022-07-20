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
      title: 'Маленький',
      desc: '(от 1 до 10 кг)',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Средний',
      desc: '(от 10 до 30 кг)',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Большой',
      desc: '(от 30 кг)',
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
