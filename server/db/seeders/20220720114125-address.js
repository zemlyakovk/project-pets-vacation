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
    await queryInterface.bulkInsert('Addresses', [{
      user_id: null,
      sitter_id: 1,
      address: 'г Москва, ул Хованская, д 15Б',
      zip_code: '129515',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул Хованская',
      latitude: 55.82985,
      longitude: 37.619198,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 2,
      address: 'г Москва, ул 2-я Прогонная, д 7 стр 7',
      zip_code: '107258',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул 2-я Прогонная',
      latitude: 55.810406,
      longitude: 37.70618,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 3,
      address: 'г Москва, Сиреневый б-р, д 8Б',
      zip_code: '105425',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Сиреневый б-р',
      latitude: 55.801212,
      longitude: 37.77785,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 4,
      address: 'г Москва, Ленинградский пр-кт, д 37 к 3',
      zip_code: '125167',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Ленинградский пр-кт',
      latitude: 55.79363,
      longitude: 37.545086,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 5,
      address: 'г Москва, ул Улофа Пальме, д 7 стр 1',
      zip_code: '119330',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул Улофа Пальме',
      latitude: 55.717406,
      longitude: 37.50752,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 6,
      address: 'г Москва, Ленинский пр-кт, д 101 стр 1',
      zip_code: null,
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Ленинский пр-кт',
      latitude: 55.66663,
      longitude: 37.514257,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 7,
      address: 'г Москва, ул Маршала Неделина, д 18',
      zip_code: '121354',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул Маршала Неделина',
      latitude: 55.7255983,
      longitude: 37.4108355,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 8,
      address: 'г Москва, ул Намёткина, д 10А стр 6',
      zip_code: '117420',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул Намёткина',
      latitude: 55.660221,
      longitude: 37.551169,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 9,
      address: 'г Москва, Каширский проезд, д 25 к 1',
      zip_code: '115201',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Каширский проезд',
      latitude: 55.654794,
      longitude: 37.6244657,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 10,
      address: 'г Москва, ул Люблинская, д 104 стр 3',
      zip_code: '109369',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'ул Люблинская',
      latitude: 55.652364,
      longitude: 37.740165,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 11,
      address: 'г Москва, Крутицкая наб, д 23 стр 3',
      zip_code: '115088',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Крутицкая наб',
      latitude: 55.719308,
      longitude: 37.6588109,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
    }, {
      user_id: null,
      sitter_id: 12,
      address: 'г Москва, Волгоградский пр-кт, д 127 к 3',
      zip_code: '109443',
      region: 'г Москва',
      district: null,
      city: 'г Москва',
      settlement: null,
      street: 'Волгоградский пр-кт',
      latitude: 55.706852,
      longitude: 37.77036,
      createdAt: new Date(),
      updatedAt: new Date(),
      area: null
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
