const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sitter_pet_age extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      
    }
  }
  Sitter_pet_age.init({
    sitter_id: DataTypes.INTEGER,
    pet_age_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Sitter_pet_age',
  });
  return Sitter_pet_age;
};
