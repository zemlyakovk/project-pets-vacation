module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sitter_dates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sitter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sitters',
          key: 'id',
        },
      },
      aval_date: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sitter_dates');
  },
};
