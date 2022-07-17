module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      sitter_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Sitters',
          key: 'id',
        },
      },
      address: {
        type: Sequelize.STRING(1000)
      },
      zip_code: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      settlement: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex(
      'Addresses',
      ['user_id', 'sitter_id', 'address', 'zip_code', 'region', 'district', 'city', 'settlement', 'street', 'latitude', 'longitude'],
      {
        name: 'addresss_user_index',
        unique: false,
      },
    );
    await queryInterface.addIndex(
      'Sitter_dates',
      ['sitter_id', 'aval_date'],
      {
        name: 'Dates_user_index',
        unique: false,
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};
