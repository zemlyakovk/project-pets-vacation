const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Sitter, Pet_size, Pet_age, Sitter_date, Sitter_pet_age, Sitter_pet_size, Address, User
} = require('../db/models');
const sitter = require('../db/models/sitter');
const user = require('../db/models/user');

//* Получение данных ситтера
router.get('/profile', async (req, res) => {
  try {
    if (req.session.userId) {
      const sitter = await Sitter.findOne({
        where: {
          user_id: req.session.userId,
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
        },
        {
          model: Address,
          attributes: [
            'address', 'zip_code', 'region', 'district', 'city', 'settlement', 'street', 'latitude', 'longitude', 'area'
          ]
        }
        ],
      });
      if (!sitter?.Address && sitter) {
        console.log('Ytn sitters');
        const user = await User.findOne({
          where: {
            id: sitter.user_id
          },
          include: {
            model: Address,
            attributes: [
              'address', 'zip_code', 'region', 'district', 'city', 'settlement', 'street', 'latitude', 'longitude', 'area'
            ]
          }
        })
        sitter.Address = user.Address ? user.Address : {};
      }
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
    Sitter_dates,
    Address: Addresses
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
    if (Addresses?.address) {
      const { address, zip_code, region, district, city, settlement, street, latitude, longitude, area } = Addresses;
      await Address.create({
        address, zip_code, region, district, city, settlement, street, latitude, longitude, area, sitter_id: newSitter.id
      })
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error('Ошибка обновления записи!'));
  }
});
//* Обновление ситтера
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
    Sitter_dates,
    Address: Addresses
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
    if (Addresses?.address) {
      const { address, zip_code, region, district, city, settlement, street, latitude, longitude, area } = Addresses;
      const [newAddress, created] = await Address.findOrCreate({
        where: {
          sitter_id: sitter.id
        },
        defaults: {
          address, zip_code, region, district, city, settlement, street, latitude, longitude, area
        }
      })
      if (!created) {
        await Address.update(
          {
            address, zip_code, region, district, city, settlement, street, latitude, longitude, area
          },
          {
            where: {
              sitter_id: sitter.id
            }
          }
        )
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error('Ошибка обновления записи!'));
  }
})
router.get('/all', async (req, res) => {
  const sitters = await Sitter.findAll({
    include: [
      {
        model: Address,
      },
      {
        model: User,
      }]
  });

  return res.status(200).json(sitters);
})
module.exports = router;
