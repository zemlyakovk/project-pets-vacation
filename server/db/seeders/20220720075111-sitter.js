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
    await queryInterface.bulkInsert('Sitters', [{
      user_id: 1,
      cat_flag: true,
      dog_flag: true,
      experience: 4,
      has_pet_flag: false,
      has_child: false,
      supervision_24: false,
      price_per_day: 1000,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 400,
      desc: 'Мой опыт работы догситтером уже больше 7 лет. Общение и ухаживание за животными началось ещё с подросткового возраста, тогда я заботилась о моей собаке, попугае и шиншилле. Теперь, мое когда-то увлечение превратилось в основное занятие, но с заработком!',
      active: true,
      title: 'Всегда рада новым животным!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 2,
      cat_flag: true,
      dog_flag: true,
      experience: 10,
      has_pet_flag: false,
      has_child: false,
      supervision_24: false,
      price_per_day: 2000,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 600,
      desc: 'Дом находится у леса и парка, вы сами задаёте количество и продолжительность прогулок внимательно отношусь к особенностям собачки: где привыкла спать, какие лакомства допускаются, любимые игры. Строго соблюдаю рекомендации по кормлению.',
      active: true,
      title: 'К каждой собаке, что приходит в дом отношусь с любовью и ОТВЕТСТВЕННОСТЬЮ!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 3,
      cat_flag: false,
      dog_flag: true,
      experience: 2,
      has_pet_flag: true,
      has_child: true,
      supervision_24: true,
      price_per_day: 900,
      housing_type: 'Квартира',
      walking: false,
      staying: true,
      price_per_hour: 400,
      desc: 'Индивидуальная передержка: стоимость по весу +700р. Щенки не приученные к выгулу и пеленке +50%, частично приученные +30%. Передержка выходного дня ( пт, сб, вс) оплата день заезда/выезда выезда.',
      active: true,
      title: 'Вам спокойствие, вашему "хвосту" безопасность и забота.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 4,
      cat_flag: true,
      dog_flag: true,
      experience: 1,
      has_pet_flag: true,
      has_child: false,
      supervision_24: true,
      price_per_day: 1000,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 400,
      desc: 'Цена передержки для собак весом: до 10 кг -1000 сутки 10-20 кг -1300 сутки 20-30 кг - 1500 сутки Щенки от 1300 сутки Цена передержки в Новогодние праздники +500 в сутки к цене за животное',
      active: true,
      title: 'Профессиональная передержка Вашей собаки дома',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 5,
      cat_flag: true,
      dog_flag: true,
      experience: 7,
      has_pet_flag: false,
      has_child: false,
      supervision_24: false,
      price_per_day: 3000,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 1000,
      desc: 'Если у вас собака, которую не хотят/боятся брать другие ситтеры и зоогостиницы, или вам нужна дрессировка или коррекция поведения, то это ко мне. Есть различные программы передержки с дрессировкой. Опыт, ответственность и знание своего дела - залог комфортного и безопасного содержания Вашего питомца.',
      active: true,
      title: 'Передержка с дрессировкой или коррекцией поведения',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 6,
      cat_flag: false,
      dog_flag: true,
      experience: 4,
      has_pet_flag: false,
      has_child: true,
      supervision_24: true,
      price_per_day: 1100,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 600,
      desc: 'В летнее время и в выходные дни возможен выезд в Подмосковье на машине, а именно в Можайск на дачу, где есть возможность круглосуточного свободного выгула.',
      active: true,
      title: 'Некому оставить собаку на время отпуска? Тогда вам к нам!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 7,
      cat_flag: true,
      dog_flag: true,
      experience: 6,
      has_pet_flag: true,
      has_child: false,
      supervision_24: false,
      price_per_day: 1200,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 600,
      desc: 'Под окнами дома расположен прекрасный большой лесопарк, так что нам будет где гулять и играть. По натуре свой педант, поэтому буду строго соблюдать установленные вами правила ухода за собакой.',
      active: true,
      title: 'С удовольствием позабочусь о вашем хвостике!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 8,
      cat_flag: true,
      dog_flag: true,
      experience: 4,
      has_pet_flag: false,
      has_child: true,
      supervision_24: false,
      price_per_day: 750,
      housing_type: 'Квартира',
      walking: false,
      staying: true,
      price_per_hour: 0,
      desc: 'Фото и видео отчёты , ежедневно ! Ждём в Гости Цены за передержку 750 руб - маленькие породы ( Йорки ,Чихуа и т.п) 900руб-средние породы ( Корги , Джек Рассел ,Пудель и т.п) 1000руб - (Хаски ,Лабродоры и т.п ) 1100 руб- крупные (Акита Ину и т.п) День приезда и отъезда , считается .',
      active: true,
      title: 'Всегда рада новым животным!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 9,
      cat_flag: true,
      dog_flag: true,
      experience: 8,
      has_pet_flag: false,
      has_child: false,
      supervision_24: false,
      price_per_day: 1500,
      housing_type: 'Квартира',
      walking: false,
      staying: true,
      price_per_hour: 0,
      desc: 'Если у Вас несколько собак - есть загородный дом. Фото и видео гарантирую. Если нужен круглосуточный надзор, если меня нет дома, то всегда есть мой сожитель, который тоже любит собак.',
      active: true,
      title: 'Приму Вашу собаку на передержку.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 10,
      cat_flag: true,
      dog_flag: true,
      experience: 4,
      has_pet_flag: true,
      has_child: false,
      supervision_24: true,
      price_per_day: 1000,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 400,
      desc: 'Рядом парков нет, но когда гуляем, доходим и до них, гуляем долго. Без проблем сможем отправлять фото питомца. Дома кто то из семьи находится постоянно. ',
      active: true,
      title: 'Наш дом всегда рад гостям.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 11,
      cat_flag: true,
      dog_flag: true,
      experience: 6,
      has_pet_flag: false,
      has_child: false,
      supervision_24: true,
      price_per_day: 1300,
      housing_type: 'Квартира',
      walking: true,
      staying: true,
      price_per_hour: 600,
      desc: 'Стоимость передержки: Малых до 10кг - 1.300 руб./сутки; Средних и крупных пород - 1.500 руб. Передержка до 3-х дней включительно - 1.500 руб./ сутки; Щенки до 1 года - 1.500 руб./ сутки; Новогодние и майские праздники 50 % от стоимости передержки в сутки. Ждём Вас и Вашего любимца в гости!',
      active: true,
      title: 'Позабочусь о вашем любимце!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: 12,
      cat_flag: true,
      dog_flag: true,
      experience: 3,
      has_pet_flag: false,
      has_child: false,
      supervision_24: false,
      price_per_day: 850,
      housing_type: 'Квартира',
      walking: false,
      staying: true,
      price_per_hour: 0,
      desc: 'Полечу если необходимо, помою- причешу. Прогулки 2-3 раза в день в зависимости от погоды. Обеспечу теплую, мягкую постель. Приму на передержку так же птичек, кроликов, крыс и других грызунов, рептилий( есть опыт содержания). Обращайтесь, всегда рада помочь.',
      active: true,
      title: 'Позабочусь о Вашем питомце в Ваше отсутствие',
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
