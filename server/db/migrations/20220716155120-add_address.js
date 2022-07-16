module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING(1000),
    });
    await queryInterface.addColumn('Users', 'latitude', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Users', 'longitude', {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
