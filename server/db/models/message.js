const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Chat }) {
      this.belongsTo(User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(Chat, {
        foreignKey: 'chat_id'
      })
    }
  }
  Message.init({
    user_id: DataTypes.INTEGER,
    chat_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    isReaded: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
