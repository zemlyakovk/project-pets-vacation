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
    await queryInterface.bulkInsert('Sitter_dates', [{
      sitter_id: 1,
      aval_date: '2022-07-25',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-07-26',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-07-27',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-07-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-07-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-07-30',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-07-25',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-07-26',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-07-27',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-07-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-07-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-15',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      aval_date: '2022-08-16',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 8,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 9,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-07-25',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-07-26',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-07-27',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-07-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-07-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-07-25',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-07-26',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-07-27',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-07-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-07-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 11,
      aval_date: '2022-08-14',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-07-25',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-07-26',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-07-27',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-07-28',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-07-29',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-01',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-02',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-03',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-04',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-05',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-07',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-08',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-09',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-13',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 12,
      aval_date: '2022-08-14',
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
