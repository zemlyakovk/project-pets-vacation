import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import {useBeforeUnload} from './useBeforeUpload';
const SERVER_URL = process.env.REACT_APP_API_URL;

export const useChat = (roomId, userId) => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })
    // отправляем запрос на получение сообщений
    socketRef.current.emit('message:get')

    // обрабатываем получение сообщений
    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.user_id === userId ? { ...msg, currentUser: true } : msg
      )
      setMessages(newMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId, userId])
// добавление сообщений
  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })
  return { messages, sendMessage }
}
