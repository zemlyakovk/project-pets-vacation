const { Message, User } = require('../db/models')

module.exports = (io, socket) => {
  // обрабатываем запрос на получение сообщений
  console.log('RoomId===>', socket.roomId);
  const getMessages = async () => {
    // получаем сообщения из БД
    const messages = await Message.findAll({
      where: {
        chat_id: socket.roomId
      },
      include: {
        model: User,
      }
    })
    console.log('=====>', messages);
    // передаем сообщения пользователям, находящимся в комнате
    // синонимы - распространение, вещание, публикация
    io.in(socket.roomId).emit('messages', messages)
  }

  // обрабатываем добавление сообщения
  // функция принимает объект сообщения
  const addMessage = async (message) => {
    await Message.create({ user_id: message.userId, chat_id: socket.roomId, text: message.messageText })
    // выполняем запрос на получение сообщений
    getMessages()
  }

  // // обрабатываем удаление сообщение
  // // функция принимает id сообщения
  // const removeMessage = (messageId) => {
  //   db.get('messages').remove({ messageId }).write()

  //   getMessages()
  // }

  // регистрируем обработчики
  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  // socket.on('message:remove', removeMessage)
}
