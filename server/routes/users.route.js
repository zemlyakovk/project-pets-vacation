const router = require('express').Router();
const { User, Address } = require('../db/models');

router.patch('/:id', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    sex,
    desc,
    phone,
    age,
    id,
    Address: Addresses } = req.body;
  try {
    await User.update(
      {
        first_name,
        last_name,
        email,
        sex,
        desc,
        phone,
        age,
      },
      {
        where: { id }
      }
    )
    if (Addresses?.address) {
      if (Addresses?.address) {
        const { address, zip_code, region, district, city, settlement, street, latitude, longitude, area } = Addresses;
        const [newAddress, created] = await Address.findOrCreate({
          where: {
            user_id: id
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
                user_id: id
              }
            }
          )
        }
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
})

// router.post('/avatar', mult.single('avatar'), (req, res) => {
//   console.log('===>', req.file);
// })

module.exports = router;
