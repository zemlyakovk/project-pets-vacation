const router = require('express').Router();
const { Sitter, User,Reviews } = require('../db/models');

router.post('/', async (req, res) => {

  const { input, rating} = req.body;
  const otziv = await Reviews.create({
    desc: input,
    rating
  })
});

router.get('/', async (req, res) => {
  const data = await Reviews.findAll({where:{sitter_id: req.query.id},include: {
    model: User,
  },},{raw: true})
  res.json(data)
})

module.exports = router;
