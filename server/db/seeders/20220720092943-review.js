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
    await queryInterface.bulkInsert('Reviews', [{
      sitter_id: 1,
      user_id: 2,
      desc: 'Большое спасибо! Все было супер!',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      user_id: 3,
      desc: 'Дай Бог здоровья!',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 1,
      user_id: 5,
      desc: 'Были небольшие замечания, а так все хорошо.',
      rev_date: new Date(),
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      user_id: 10,
      desc: 'На самом деле, очень тяжело найти догситтера для двух такс) Но, спасибо большое Марии за то, что согласилась! Я была очень спокойна на протяжении всего времени передержки! Мария присылала фотоотчеты и регулярно рассказывала, как у них дела',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 2,
      user_id: 7,
      desc: 'Нашей Черри посчастливилось остаться в такого замечательного человека! Максимально ответственная, заботливая, деликатная! Сразу понятно, что с этим догситером ваш питомец будет в надёжных и добрых руках!',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      user_id: 5,
      desc: 'Спасибо большое за внимание и заботу. Собачка вернулась в хорошем настроении, судя по фото, на передержке не грустила, подружилась со всеми членами семьи.',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 3,
      user_id: 9,
      desc: 'Все прошло просто замечательно. Огромное спасибо Василисе за заботу о нашем питомце!',
      rev_date: new Date(),
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 4,
      user_id: 7,
      desc: 'Всегда посылала .все было хорошо',
      rev_date: new Date(),
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 5,
      user_id: 8,
      desc: 'Я так плакала, когда отдавала своего песеля. Потому что первый раз отдавала. Но зря плакала',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 6,
      user_id: 11,
      desc: 'Уезжали на 2 недели, очень волновались, т.к. оставляли нашего собакена в семье впервые. Все прошло отлично. ',
      rev_date: new Date(),
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 7,
      user_id: 2,
      desc: 'Оставлял собаку на месяц, все прошло отлично!',
      rev_date: new Date(),
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      sitter_id: 10,
      user_id: 4,
      desc: 'Наш француз явно хорошо перенёс передержку, выглядел очень довольным, с собакой',
      rev_date: new Date(),
      rating: 5,
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
