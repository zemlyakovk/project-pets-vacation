const router = require('express').Router();
const { Sitter, User,Reviews } = require('../db/models');

router.post('/', async (req, res) => {

  const { input, rating} = req.body;
  const otziv = await Reviews.create({
    desc: input,
    rating
  })
});


module.exports = router;
