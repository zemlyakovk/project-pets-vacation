import React from 'react'
import { Link } from 'react-router-dom'

export default function ChatMiniCard({ chat }) {
  return (
    <div className="flex justify-center mt-2">
      <div className="rounded-lg shadow-lg bg-white w-1/2">
        <Link to={`/users/chat/${chat.id}`}>
          <div className='flex items-center my-2 ml-4'>
            <img class="rounded-full w-[40px] h-[40px] m-4 object-cover " src={`${process.env.REACT_APP_STATIC_URL}${chat.User?.profile_photo}`} alt="" />
            <div className="p-4 w-full">
              <p className='font-bold'>{chat.User.first_name}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
