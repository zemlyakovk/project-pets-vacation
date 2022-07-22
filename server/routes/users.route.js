const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Address, Chat, Message, sequelize } = require('../db/models');
const chat = require('../db/models/chat');
const { saveAvatar } = require('../middleware/middleware');

router.patch('/:id', saveAvatar, async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    sex,
    desc,
    phone,
    age,
    id,
    profile_photo,
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
        profile_photo
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
router.get('/chat', async (req, res) => {
  try {
    const { user_1, user_2 } = req.query;
    const [chat, created] = await Chat.findOrCreate({
      where: {
        user_id_1: {
          [Op.or]: [user_1, user_2],
        },
        user_id_2: {
          [Op.or]: [user_1, user_2],
        }
      },
      defaults: {
        user_id_1: user_1,
        user_id_2: user_2
      }
    })

    const chatData = await Chat.findOne({
      where: {
        id: chat.id
      },
      include: {
        model: User,
        as: 'Second_user'
      }
    })

    res.status(200).json(chatData);
  } catch (error) {
    console.log(error);
  }
})
router.get('/myChats', async (req, res) => {
  try {
    const { user_id } = req.query;
    const chatsOut = await Chat.findAll({
      where: {
        user_id_1: user_id,
      },
      attributes: [['user_id_2', 'user_id'], 'id'],
      include: [{
        model: Message
      },
      {
        model: User,
        as: 'Second_user'
      }]
    })
    const chatsIn = await Chat.findAll({
      where: {
        user_id_2: user_id,
      },
      attributes: [['user_id_1', 'user_id'], 'id'],
      include: [{
        model: Message
      },
      {
        model: User,
        as: 'First_user'
      }]
    })
    const chatsOutFix = chatsOut.map((el) => (
      { cur_user_id: el.user_id,
        id: el.id,
        Messages: el.Messages,
        User: el.Second_user }
    ))
    const chatsInFix = chatsIn.map((el) => (
      { cur_user_id: el.user_id,
        id: el.id,
        Messages: el.Messages,
        User: el.First_user }
    ))
    res.status(200).json([...chatsOutFix, ...chatsInFix]);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
