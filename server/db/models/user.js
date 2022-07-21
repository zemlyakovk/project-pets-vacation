const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Sitter, Address, Reviews, Favorit_sitters }) {
      this.hasOne(Sitter, {
        foreignKey: 'user_id',
      });
      this.hasOne(Address, {
        foreignKey: 'user_id',
      });
      this.hasMany(Reviews, {
        foreignKey: 'user_id',
      });
      this.hasMany(Favorit_sitters, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
