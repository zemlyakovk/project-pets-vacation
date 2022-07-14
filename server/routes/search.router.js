const router = require('express').Router();
const { Sitter, User } = require('../db/models');

router.post('/', async (req, res) => {
  // console.log(req.body);
  let sitters;
  const {
    radioValue, textValue, dateFrom, dateTo, serviceType,
  } = req.body;
  if (radioValue === 'Собака') {
    sitters = await Sitter.findAll({ where: { dog_flag: true }, include: { model: User } });
  } else {
    sitters = await Sitter.findAll({ where: { cat_flag: true }, include: { model: User } });
  }
  console.log(sitters);
  res.send('bla');
});

module.exports = router;
