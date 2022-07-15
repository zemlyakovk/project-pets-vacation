const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sitter_date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sitter }) {
      this.belongsTo(Sitter, {
        foreignKey: 'sitter_id',
      });
    }
  }
  Sitter_date.init({
    sitter_id: DataTypes.INTEGER,
    aval_date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Sitter_date',
  });
  return Sitter_date;
};
