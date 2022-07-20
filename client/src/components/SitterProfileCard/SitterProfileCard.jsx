import React from 'react'
import Review from '../../pages/Review'

export default function SitterProfileCard() {
  return (
    <div class="flex justify-center mt-4 h-[500px]">

      <div class="rounded-lg shadow-lg bg-white w-[290px]">
        <div className='flex flex-row mt-2 ml-5 items-center'>
          <a href="#!">
            <img class="rounded-full w-[96px]" src={`${process.env.REACT_APP_STATIC_URL}1658215752423-avatar.png`} alt="" />
          </a>
          <div className='ml-5 '>
            <p className='mb-2 '>Дмитрий</p>
            <p className='mb-2 '>29</p>
            <p className=''>г Москва</p>
          </div>
        </div>

        <div className="p-4 w-full">
          <button type="button" className=" inline-block px-6  py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-2">Написать ситтеру</button>
          <div><Review /></div>
          <div className='flex flex-row mt-2'>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg> 5.0
          </div>
          <p class="text-gray-700 text-base mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos est sequi commodi veritatis ipsam quia excepturi quo. Laudantium voluptatem cupiditate temporibus perferendis nisi labore. Delectus id cumque inventore consequuntur mollitia.
          </p>
        </div>
      </div>
    </div>
  )
}
