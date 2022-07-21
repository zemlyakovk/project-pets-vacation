const router = require('express').Router();
const { Op } = require("sequelize");
const { Sitter, User, Sitter_date, Address, sequelize, Pet_age, Pet_size } = require('../db/models');
const { customeWhere, formatDate } = require('../controller/controller')

router.get('/', async (req, res) => {
  const sitters = [];
  const obj = {};
  const {
    radioValue, dateFrom, dateTo, serviceType, latitude, longitude, distance, sitter_pet_ages, sitter_pet_sizes
  } = req.query;

  const arrAge = sitter_pet_ages?.length ? sitter_pet_ages : ['Щенок', 'Взрослый', 'Старый'];
  const arrSize = sitter_pet_sizes?.length ? sitter_pet_sizes : ['Маленький', 'Большой', 'Средний'];

  console.log(radioValue, dateFrom, dateTo, serviceType, latitude, longitude, distance);
  const haversine = `(6371 * acos(cos(radians(${latitude}))* cos(radians(latitude))* cos(radians(longitude) - radians(${longitude}))+ sin(radians(${latitude})) * sin(radians(latitude))))`;

  if (dateTo) {
    try {
      // функция, считающая, сколько дней между dateFrom до dateTo
      const fDateFrom = formatDate(dateFrom);
      const fDateTo = formatDate(dateTo);
      const getNumberOfDays = function (start, end) {
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = end.getTime() - start.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays + 1;
      }
      const numberOfDays = getNumberOfDays(fDateFrom, fDateTo);

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
            where: { aval_date: { [Op.between]: [fDateFrom, fDateTo] } }
          },
          {
            model: User,
          },
          {
            model: Pet_age,
            where: {
              title: {
                [Op.in]: arrAge
              }
            }
          },
          {
            model: Pet_size,
            where: {
              title: {
                [Op.in]: arrSize
              }
            }
          }]
      })

      const searchResult = sitters.filter((sitter) => sitter.Sitter_dates.length === numberOfDays)
      res.json(searchResult)
    } catch (err) {
      console.log(err);
      res.json([])
    }
  } else {
    res.send(200)
  }
});

module.exports = router;
