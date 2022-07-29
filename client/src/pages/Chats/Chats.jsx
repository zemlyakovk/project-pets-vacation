import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from '../../axios/axios';
import ChatMiniCard from '../../components/ChatMiniCard/ChatMiniCard';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { auth } = useSelector(state => state);

  useEffect(() => {
    if (auth.id) {
      axios.get('/users/myChats', { params: { user_id: auth.id } }).then(data => setChats(data.data));
    }
  }, [auth])

  return (
    <>
      {
        chats.map(chat => <ChatMiniCard key={chat.id} chat={chat} />)
      }
    </>
  )
}
