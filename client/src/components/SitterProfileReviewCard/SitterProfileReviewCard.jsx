import React from 'react'

export default function SitterProfileReviewCard({desc,rating, name, profile_photo, time}) {







  return (
    <div className="flex justify-center mt-2">

    <div className="rounded-lg shadow-lg bg-white w-[600px]">
      <div className='flex flex-row mt-2 ml-4'>
      
        <img class="rounded-full w-[128px] h-[128px]"  src={`${process.env.REACT_APP_STATIC_URL}${profile_photo}`} alt=""/>
     
      <div className='ml-2 '>
      
        <div className="p-4 w-full">
          <p className=' ml-[182px]'>{time.slice(0,10)}</p>
        <p className='mb-2 font-bold'>{name}</p>
      <div className='flex flex-row mt-2'>
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
         <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
        </svg> {rating}
         </div>
        <p class="text-gray-700 text-base my-2">{desc}</p>
      </div>

      </div>
      </div>
  
   
    </div>
  </div>
  )
}
