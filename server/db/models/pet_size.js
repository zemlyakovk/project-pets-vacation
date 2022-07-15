const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet_size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sitter }) {
      this.belongsToMany(Sitter, {
        through: 'Sitter_pet_size',
        foreignKey: 'pet_size_id',
      });
    }
  }
  Pet_size.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pet_size',
  });
  return Pet_size;
};
