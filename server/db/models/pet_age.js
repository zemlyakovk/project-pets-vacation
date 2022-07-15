const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet_age extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sitter }) {
      this.belongsToMany(Sitter, {
        through: 'Sitter_pet_age',
        foreignKey: 'pet_age_id',
      });
    }
  }
  Pet_age.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pet_age',
  });
  return Pet_age;
};
