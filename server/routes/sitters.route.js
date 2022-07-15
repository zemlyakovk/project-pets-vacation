const router = require('express').Router();
const {
  Sitter, Pet_size, Pet_age, Sitter_date,
} = require('../db/models');

router.get('/profile', async (req, res) => {
  try {
    const check = 1;
    if (check) {
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
module.exports = router;
