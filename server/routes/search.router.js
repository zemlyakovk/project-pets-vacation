const router = require('express').Router();
const { Op } = require("sequelize");
const { Sitter, User, Sitter_date, Address, sequelize } = require('../db/models');
const { customeWhere } = require('../controller/controller')

router.get('/', async (req, res) => {
  const sitters = [];
  const obj = {};
  const {
    radioValue, dateFrom, dateTo, serviceType, latitude, longitude, distance
  } = req.query;

  console.log(radioValue, dateFrom, dateTo, serviceType, latitude, longitude, distance);
  const haversine = `(6371 * acos(cos(radians(${latitude}))* cos(radians(latitude))* cos(radians(longitude) - radians(${longitude}))+ sin(radians(${latitude})) * sin(radians(latitude))))`;

  if (dateTo) {
    try {
      // функция, считающая, сколько дней между dateFrom до dateTo
      const getNumberOfDays = function (start, end) {
        const date1 = new Date(start);
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays + 1;
      }
      const numberOfDays = getNumberOfDays(dateFrom, dateTo);

      const filterWhere = customeWhere(req.query)

      const sitters = await Sitter.findAll({
        where: { ...filterWhere },
        include: [
          {
            model: Address,
            attributes: ['id',
              'address',
              'zip_code',
              'region',
              'district',
              'city',
              'settlement',
              'street',
              'latitude',
              'longitude',
              'area',
              [sequelize.literal(haversine), 'distance']],
            where: {
              [Op.and]: [
                sequelize.where(sequelize.literal(haversine), '<=', +distance),
              ]
            },
          },
          {
            model: Sitter_date,
            where: { aval_date: { [Op.between]: [new Date(dateFrom), new Date(dateTo)] } }
          },
          {
            model: User,
          }]
      })

      console.log('SBBBBBBBters==>', sitters);

      // const sitterFilterDate = await Sitter_date.findAll({ where: { aval_date: { [Op.between]: [new Date(dateFrom), new Date(dateTo)] } } });
      // // console.log('нашли по датам ===>>>', sitterFilterDate);
      // // формируем массив с массивами. Вложенные массивы сгруппированны по sitter_id
      // const map = sitterFilterDate.reduce((r, i) => {
      //   r[i.sitter_id] = r[i.sitter_id] || [];
      //   r[i.sitter_id].push(i);
      //   return r;
      // }, {});

      // const arr1 = [];

      // for (const key in map) {
      //   arr1.push(map[key]);
      // }

      // const resultArrSitterID = []; // итоговый массив с айди ситтеров, которые могут сидеть в это время

      // for (let i = 0; i < arr1.length; i++) {
      //   if (arr1[i].length === numberOfDays) {
      //     resultArrSitterID.push(arr1[i][0].sitter_id)
      //   }
      // }

      // if (radioValue === ' Собака') {
      //   console.log('radioValue====', radioValue);
      //   if (serviceType === ' Передержка') {
      //     console.log('serviceType====', serviceType);
      //     const requestUser = resultArrSitterID.map((el) => User.findOne({ include: { model: Sitter, where: { dog_flag: true, id: el, staying: true, active: true } } }).then())
      //     sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
      //     console.log('ajdsf;lkjsdflksdjf', sitters);
      //     res.json(sitters)
      //   } else {
      //     const requestUser = resultArrSitterID.map((el) => User.findOne({ include: { model: Sitter, where: { dog_flag: true, id: el, staying: false, active: true } } }).then())
      //     sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
      //     res.json(sitters)
      //   }
      //   // console.log(sitters);
      // } else if (radioValue === 'Кошка') {
      //   if (serviceType === 'Передержка') {
      //     const requestUser = resultArrSitterID.map((el) => User.findOne({ include: { model: Sitter, where: { cat_flag: true, id: el, staying: true, active: true } } }).then())
      //     sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
      //     res.json(sitters)
      //   } else {
      //     const requestUser = resultArrSitterID.map((el) => User.findOne({ include: { model: Sitter, where: { cat_flag: true, id: el, staying: false, active: true } } }).then())
      //     sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
      //     res.json(sitters)
      //   }
      // }
    } catch (err) {
      console.log(err);
      res.json([])
    }
  } else {
    res.send(200)
  }
});

module.exports = router;
