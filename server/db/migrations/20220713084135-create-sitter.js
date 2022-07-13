module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sitters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      cat_flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      dog_flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      has_pet_flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      has_child: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      supervision_24: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      price_per_day: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      housing_type: {
        type: Sequelize.STRING(30),
      },
      walking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      staying: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      price_per_hour: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.addIndex(
      'Sitters',
      ['price_per_day', 'price_per_hour', 'experience'],
      {
        name: 'sitters_user_index',
        unique: false,
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sitters');
  },
};
