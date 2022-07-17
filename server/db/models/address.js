const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sitter, User }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Sitter, {
        foreignKey: 'sitter_id',
      });
    }
  }
  Address.init({
    user_id: DataTypes.INTEGER,
    sitter_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    region: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    settlement: DataTypes.STRING,
    street: DataTypes.STRING,
    area: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
