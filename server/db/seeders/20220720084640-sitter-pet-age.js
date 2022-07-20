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
    await queryInterface.bulkInsert('Sitter_pet_ages', [{
      sitter_id: 1,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      pet_age_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      pet_age_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      pet_age_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      pet_age_id: 3,
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
