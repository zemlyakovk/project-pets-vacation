import React from 'react'

export default function MiniCardSitter
() {
  return (
    
  // <div className="flex justify-center">
    
  //   <div className="flex flex-row rounded-lg bg-white shadow-lg p-2">
  //     <img className=" rounded-lg object-contain w-40  " src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
  //     <div className="p-6 flex flex-col justify-start">
  //       <h5 className="text-gray-900 text-xl font-medium">Василий Петр</h5>
  //       <div className='text-gray-700 text-base  ' >г. Москва</div>
  //       <div className='flex flex-row'>
  //       <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
  //     <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
  //     </svg> 5.0
  //     </div>
  //       <p className="text-gray-700 text-base mb-4">
  //        краткое описание.
  //       </p>
  //       <button className=' bg-blue-500 text-white rounded-lg mt-40'>
  //         подробнее
  //       </button>
  //     </div>
  //   </div>
   
  //   </div>
<div class="flex justify-center p-2">
  <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
    <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Василий Петр</h5>
      <p class="text-gray-700 text-base mb-4">
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </p>
      <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
    </div>
  </div>
</div>

  )
}
