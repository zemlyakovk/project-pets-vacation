const router = require('express').Router();
const { Favorit_sitters, Sitter, User } = require('../db/models');
const { saveAvatar } = require('../middleware/middleware')

router.post('/add', async (req, res) => {
  try {
    const sitterId = req.body.params; // кого надо добавить в избранное
    const { userId } = res.locals // кому надо добавить в избранное
    const favorit = await Favorit_sitters.create({ sitter_id: sitterId, user_id: userId });
    res.json(favorit)
  } catch (err) {
    console.log(err);
    res.status(500).json(new Error('Ошибка добавления в избранное!'));
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId } = res.locals
    const favorits = await Favorit_sitters.findAll({ where: { user_id: userId }, include: { model: Sitter, include: { model: User } } });
    res.json(favorits)
  } catch (err) {
    console.log(err);
    res.status(500).json(new Error('Ошибка отображения избранного!'));
  }
});

module.exports = router;
