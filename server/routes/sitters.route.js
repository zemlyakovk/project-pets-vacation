const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Sitter, Pet_size, Pet_age, Sitter_date, Sitter_pet_age, Sitter_pet_size
} = require('../db/models');
const sitter = require('../db/models/sitter');

//* Получение данных ситтера
router.get('/profile', async (req, res) => {
  try {
    if (req.session.userId) {
      const sitter = await Sitter.findOne({
        where: {
          user_id: 2,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [{
          model: Pet_size,
          attributes: ['title', 'desc'],
          through: { attributes: [] },
        },
        {
          model: Pet_age,
          attributes: ['title', 'desc'],
          through: { attributes: [] },
        },
        {
          model: Sitter_date,
          attributes: ['aval_date'],
        }],
      });
      return res.status(200).json(sitter);
    }
    return res.json({});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//* Создание нового ситтера
router.post('/new', async (req, res) => {
  const { title,
    desc,
    dog_flag,
    as_pet_flag,
    experience,
    housing_type,
    price_per_day,
    price_per_hour,
    has_child,
    supervision_24,
    cat_flag,
    walking,
    staying,
    Pet_ages,
    Pet_sizes,
    Sitter_dates
  } = req.body;
  try {
    const newSitter = await Sitter.create({
      user_id: req.session.userId,
      title,
      desc,
      dog_flag,
      as_pet_flag,
      experience,
      housing_type,
      price_per_day,
      price_per_hour,
      has_child,
      supervision_24,
      cat_flag,
      walking,
      staying,
    });
    console.log(newSitter);
    if (Pet_ages.length > 0) {
      const petAge = await Pet_age.findAll({
        where: {
          title: {
            [Op.in]: Pet_ages.map((age) => age.title),
          }
        }
      })
      newSitter.addPet_age(petAge, { through: Sitter_pet_age })
    }
    if (Pet_sizes.length > 0) {
      const petSize = await Pet_size.findAll({
        where: {
          title: {
            [Op.in]: Pet_sizes.map((age) => age.title),
          }
        }
      })
      newSitter.addPet_size(petSize, { through: Sitter_pet_age })
    }
    if (Sitter_dates.length > 0) {
      await Sitter_date.bulkCreate(Sitter_dates.map((date) => ({ aval_date: new Date(date.aval_date), sitter_id: newSitter.id })));
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error('Ошибка обновления записи!'));
  }
});
router.patch('/:id', async (req, res) => {
  const {
    id,
    title,
    desc,
    dog_flag,
    as_pet_flag,
    experience,
    housing_type,
    price_per_day,
    price_per_hour,
    has_child,
    supervision_24,
    cat_flag,
    walking,
    staying,
    Pet_ages,
    Pet_sizes,
    Sitter_dates
  } = req.body;
  try {
    await Sitter.update({
      title,
      desc,
      dog_flag,
      as_pet_flag,
      experience,
      housing_type,
      price_per_day,
      price_per_hour,
      has_child,
      supervision_24,
      cat_flag,
      walking,
      staying,
    }, {
      where: { id }
    });

    const sitter = await Sitter.findByPk(id);

    if (Pet_ages.length > 0) {
      await Sitter_pet_age.destroy({
        where: {
          sitter_id: id
        }
      })
      const petAge = await Pet_age.findAll({
        where: {
          title: {
            [Op.in]: Pet_ages.map((age) => age.title),
          }
        }
      })
      sitter.addPet_age(petAge, { through: Sitter_pet_age })
    }
    if (Pet_sizes.length > 0) {
      await Sitter_pet_size.destroy({
        where: {
          sitter_id: id
        }
      })
      const petSize = await Pet_size.findAll({
        where: {
          title: {
            [Op.in]: Pet_sizes.map((age) => age.title),
          }
        }
      })
      sitter.addPet_size(petSize, { through: Sitter_pet_age })
    }
    if (Sitter_dates.length > 0) {
      await Sitter_date.destroy({
        where: {
          sitter_id: id
        }
      })
      await Sitter_date.bulkCreate(Sitter_dates.map((date) => ({ aval_date: new Date(date.aval_date), sitter_id: sitter.id })));
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error('Ошибка обновления записи!'));
  }
})
module.exports = router;
