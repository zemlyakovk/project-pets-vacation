const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sitter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Pet_size, Pet_age, Sitter_date,
    }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Pet_size, {
        through: 'Sitter_pet_size',
        foreignKey: 'sitter_id',
      });
      this.belongsToMany(Pet_age, {
        through: 'Sitter_pet_age',
        foreignKey: 'sitter_id',
      });
      this.hasMany(Sitter_date, {
        foreignKey: 'sitter_id',
      });
    }
  }
  Sitter.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cat_flag: {
      type: DataTypes.BOOLEAN,
    },
    dog_flag: {
      type: DataTypes.BOOLEAN,
    },
    experience: {
      type: DataTypes.INTEGER,
    },
    has_pet_flag: {
      type: DataTypes.BOOLEAN,
    },
    has_child: {
      type: DataTypes.BOOLEAN,
    },
    supervision_24: {
      type: DataTypes.BOOLEAN,
    },
    price_per_day: {
      type: DataTypes.INTEGER,
    },
    housing_type: {
      type: DataTypes.STRING,
    },
    walking: {
      type: DataTypes.BOOLEAN,
    },
    staying: {
      type: DataTypes.BOOLEAN,
    },
    price_per_hour: {
      type: DataTypes.INTEGER,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    title: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Sitter',
  });
  return Sitter;
};
