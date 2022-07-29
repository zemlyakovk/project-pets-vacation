import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import classes from './Chat.module.css';

export default function Chat() {
  const { auth, chat: { value } } = useSelector((state) => state);
  const { id } = useParams();
  const { messages, sendMessage } = useChat(id, auth.id);
  const [mess, setMess] = useState('');
  const [avatar, setAvatar] = useState('');

  function handlerSend(e) {
    e.preventDefault();
    console.log(value);
    setMess('')
    if (mess) {
      sendMessage({ messageText: mess, senderName: auth.first_name });
    }
  }

  useEffect(() => {
    if (value.Second_user) {
      setAvatar(`${process.env.REACT_APP_STATIC_URL}${value.Second_user.profile_photo}`)
    }
  }, [value])

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-3/4 self-center shadow bg-white">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            {/* <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span> */}
            <img class="rounded-full w-[60px] h-[60px] m-4 object-cover" src={!avatar ? `${process.env.REACT_APP_STATIC_URL}123.jpeg` : avatar} alt='avatar' />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{value?.Second_user?.first_name}</span>
            </div>
          </div>
        </div>
      </div>
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {
          messages.map((msg) => msg.currentUser ?
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
                  <div><span className={classes.message}>{msg.text}</span></div>
                </div>
              </div>
            </div> :
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
                  <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-700 opacity-60">{msg.text}</span></div>
                </div>
              </div>
            </div>
          )
        }
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input type="text" placeholder="Сообщение" value={mess} onChange={(e) => setMess(e.target.value)} className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button type="button" onClick={handlerSend} className={classes.button}>
                <span className="font-bold">Отправить</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}
