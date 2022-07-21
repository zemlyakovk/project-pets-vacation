const router = require('express').Router();
const { Op } = require('sequelize');
const {
  Sitter, Pet_size, Pet_age, Sitter_date, Sitter_pet_age, Sitter_pet_size, Address, User, sequelize, Sitter_images
} = require('../db/models');
const sitter = require('../db/models/sitter');
const user = require('../db/models/user');
const { deleteFile } = require('../controller/controller');

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
          model: Sitter_date,
          attributes: ['aval_date'],
        },
        {
          model: Sitter_images,
          attributes: ['id', 'url'],
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
  } = req.body.state;
  const { addFiles } = req.body;
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
    if (addFiles?.length) {
      await Sitter_images.bulkCreate(addFiles.map((file) => ({ sitter_id: newSitter.id, url: file })));
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
  } = req.body.state;
  const { addFiles, removedFilesNames } = req.body;
  console.log(JSON.stringify(req.body));
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
    } else {
      await Sitter_pet_age.destroy({
        where: {
          sitter_id: id
        }
      })
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
    } else {
      await Sitter_pet_size.destroy({
        where: {
          sitter_id: id
        }
      })
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
    if (addFiles?.length) {
      await Sitter_images.bulkCreate(addFiles.map((file) => ({ sitter_id: sitter.id, url: file })));
    }
    if (removedFilesNames?.length) {
      removedFilesNames.forEach((file) => {
        deleteFile(file);
      })

      await Sitter_images.destroy({
        where: {
          url: {
            [Op.in]: removedFilesNames
          }
        } })
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(new Error('Ошибка обновления записи!'));
  }
})
router.get('/all', async (req, res) => {
  const { latitude, longitude, distance } = req.query;
  const haversine = `(6371 * acos(cos(radians(${latitude}))* cos(radians(latitude))* cos(radians(longitude) - radians(${longitude}))+ sin(radians(${latitude})) * sin(radians(latitude))))`;

  const sitters = await Sitter.findAll({
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
        model: User,
      }]
  });

  return res.status(200).json(sitters);
})

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const onePost = await Sitter.findOne({
    where: { id },
    include: [{
      model: User

    },
    {
      model: Sitter_images
    },
    ],

  });

  res.json(onePost);
});

module.exports = router;
