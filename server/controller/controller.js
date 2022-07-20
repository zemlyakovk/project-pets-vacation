const fs = require('fs').promises;
const { Op } = require('sequelize');

async function deleteFile(filename) {
  try {
    await fs.unlink(`public/images/${filename}`);
  } catch (error) {
    console.log(error);
  }
}

function customeWhere(query) {
  const {
    radioValue,
    serviceType,
    noChild,
    noPet,
    supervision_24,
    housing_type,
    price_per_day

  } = query;
  const where = {};
  if (radioValue === 'Собака') {
    where.dog_flag = true
  }
  if (radioValue === 'Кошка') {
    where.cat_flag = true
  }
  if (serviceType === 'Передержка') {
    where.staying = true;
  }
  if (serviceType === 'Выгул') {
    where.walking = true;
  }
  if (noChild) {
    where.has_child = false;
  }
  if (noPet) {
    where.has_pet_flag = false;
  }
  if (noPet) {
    where.has_pet_flag = false;
  }
  if (supervision_24) {
    where.supervision_24 = true;
  }
  if (housing_type) {
    where.housing_type = housing_type;
  }
  if (price_per_day > 0) {
    where.price_per_day = price_per_day
  }
  if (price_per_hour > 0) {
    where.price_per_hour = price_per_hour
  }
  if (experience > 0) {
    where.experience = experience
  }
}

module.exports = { deleteFile, customeWhere };
