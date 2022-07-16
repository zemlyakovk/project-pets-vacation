const router = require('express').Router();
const { User } = require('../db/models')

router.patch('/:id', async (req, res) => {
  const { first_name, last_name, email, sex, desc, phone, age, id } = req.body;
  try {
    await User.update(
      {
        first_name, last_name, email, sex, desc, phone, age
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

module.exports = router;
