const router = require('express').Router();
const { User } = require('../db/models');

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
    address,
    latitude,
    longitude } = req.body;
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
        address,
        latitude,
        longitude,
      },
      {
        where: { id }
      }
    )
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
})

// router.post('/avatar', mult.single('avatar'), (req, res) => {
//   console.log('===>', req.file);
// })

module.exports = router;
