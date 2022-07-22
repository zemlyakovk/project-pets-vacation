const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message, User }) {
      this.hasMany(Message, {
        foreignKey: 'chat_id'
      })
      this.belongsTo(User, { as: 'First_user', foreignKey: 'user_id_1' });
      this.belongsTo(User, { as: 'Second_user', foreignKey: 'user_id_2' });
    }
  }
  Chat.init({
    user_id_1: DataTypes.INTEGER,
    user_id_2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
