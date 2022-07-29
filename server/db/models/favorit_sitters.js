const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorit_sitters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Sitter }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Sitter, {
        foreignKey: 'sitter_id',
      });
    }
  }
  Favorit_sitters.init({
    sitter_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorit_sitters',
  });
  return Favorit_sitters;
};
