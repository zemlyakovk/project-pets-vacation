'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
    }
  }
  Reviews.init({
    sitter_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    rev_date: DataTypes.DATE,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
