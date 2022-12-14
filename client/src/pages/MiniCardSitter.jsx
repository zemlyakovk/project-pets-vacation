import React from 'react'


export default function MiniCardSitter
  () {
  return (


    <div class=" flex justify-center p-2  w-[500px] min-h-min mt-11">
      <div class="flex  flex-row rounded-lg bg-white shadow-lg">
        <div className=' flex items-center'>
          <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={`${process.env.REACT_APP_STATIC_URL}1658215752423-avatar.png`} alt="" />
        </div>
        <div class="p-4 flex flex-col justify-start">
          <div className='flex flex-row justify-between'>
            <h5 class="text-gray-900 text-xl font-medium">Дмитрий</h5>
            <div className=''>❤️</div>
          </div>

          <div className='text-gray-700 text-base' >г Москва</div>
          <div className='flex flex-row'>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg> 5.0
          </div>
          <p class="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer
          </p>

          <button className=' bg-blue-500 text-white rounded-lg mt-2 py-2'>
            подробнее
          </button>

        </div>
      </div>

    </div>



  )
}


