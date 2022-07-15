const router = require('express').Router();
const { Op } = require("sequelize");
const { Sitter, User, Sitter_date } = require('../db/models');

router.post('/', async (req, res) => {
  let sitters = [];
  const obj = {};
  const {
    radioValue, textValue, dateFrom, dateTo, serviceType,
  } = req.body;
  console.log(dateFrom, dateTo);

  if (dateTo) {
    try {
      // функция, считающая, сколько дней между dateFrom до dateTo
      function getNumberOfDays(start, end) {
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

      const sitterFilterDate = await Sitter_date.findAll({ where: { aval_date: { [Op.between]: [dateFrom, dateTo] } } });
      // console.log(sitterFilterDate);
      // формируем массив с массивами. Вложенные массивы сгруппированны по sitter_id
      const map = sitterFilterDate.reduce((r, i) => {
        r[i.sitter_id] = r[i.sitter_id] || [];
        r[i.sitter_id].push(i);
        return r;
      }, {});

      const arr1 = [];

      for (const key in map) {
        arr1.push(map[key]);
      }

      const resultArrSitterID = []; // итоговый массив с айди ситтеров, которые могут сидеть в это время

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].length === numberOfDays) {
          resultArrSitterID.push(arr1[i][0].sitter_id)
        }
      }

      // console.log(resultArrSitterID);

      if (radioValue === 'Собака') {
        if (serviceType === 'Передержка') {
          const requestUser = resultArrSitterID.map((el) => User.findAll({ include: { model: Sitter, where: { dog_flag: true, id: el, staying: true, active: true } } }).then())
          sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
          res.json(sitters)
        } else {
          const requestUser = resultArrSitterID.map((el) => User.findAll({ include: { model: Sitter, where: { dog_flag: true, id: el, staying: false, active: true } } }).then())
          sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
          res.json(sitters)
        }
        console.log(sitters);
      } else if (radioValue === 'Кошка') {
        if (serviceType === 'Передержка') {
          const requestUser = resultArrSitterID.map((el) => User.findAll({ include: { model: Sitter, where: { cat_flag: true, id: el, staying: true, active: true } } }).then())
          sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
          res.json(sitters)
        } else {
          const requestUser = resultArrSitterID.map((el) => User.findAll({ include: { model: Sitter, where: { cat_flag: true, id: el, staying: false, active: true } } }).then())
          sitters = await Promise.all(requestUser); // sitters: массив ситтеров из бд, которые могут в эти даты
          res.json(sitters)
        }
      }
    } catch (err) {
      res.json([])
    }
  } else {
    res.send(200)
  }
});

module.exports = router;
