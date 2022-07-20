import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios'
import SitterProfileReviewCard from '../SitterProfileReviewCard/SitterProfileReviewCard'

export default function SitterProfileList({sitter}) {
  const [reviewsList, setReviewsList] = useState([])
  // console.log('sssssssssssssssss',sitter);

const params = useParams()

const getAllReviews =  async () => {
  const fetchReviews = await axios.get(`/reviews?id=${params.id}`)
  setReviewsList(fetchReviews.data)
}

useEffect(()=> {
  getAllReviews()
},[])
// console.log(reviewsList);

  const spec = {
    'Опыт присмотра (лет)':  'лет', 
    'Присмотрю за собакой' : sitter?.dog_flag ? 'да' : 'нет',  
    'Присмотрю за кошкой' : sitter?.cat_flag ? 'да' : 'нет',
    'Условия содержания:' : 'да', 
    'Цена за сутки' : `${sitter?.price_per_day}`,  
    'Размер питомца' : 'да',  
    'Возраст питомца' : 'да',  
    'Выгул' : 'да',  
    'Передержка' : 'да',  
    'Цена за час' : `${sitter?.price_per_hour}`,  
    'Есть дети' : 'да',  
  }



  return (
    <div className='rounded-lg shadow-lg bg-white  w-[760px]'>
      <div className=' h-52 '>Блок с фотками
      <section className="overflow-hidden text-gray-700 ">
  <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
    <div className="flex flex-wrap -m-1 md:-m-2">
      {sitter?.Sitter_images?.map(el=>{
        return (<div className="flex flex-wrap w-1/3">
        <div className="w-full p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"/>
        </div>
      </div>)
      })}
      
      
      
      
    </div>
  </div>
</section>
      </div>
      <div className=' h-28 pl-8  leading-6'>{sitter?.desc}</div>
      <span className='font-bold text-lg ml-8'>Детали</span>
      <div className=' h-40  flex flex-wrap justify-start pl-8'>
      {Object.keys(spec).map((el, index)=>{
        return <div className='mr-4 mt-2 w-[150px]' key={index}> 
                    <div className=' text-gray-500'>{el} </div> 
                    <div>{spec[el]} </div>
               </div>
      })}
      </div>
      {/* <div className=' h-32 bg-slate-200'>Местоположение</div> */}
      <div className='mt-2 ml-4 '>
       <span className='font-bold text-lg'>Отзывы о ситтере</span> 
      {reviewsList?.map((el)=>{
        return    <SitterProfileReviewCard desc={el.desc} rating={el.rating} name={el.User.first_name}
         profile_photo={el.User.profile_photo} key={el.id}/>
      })}
   
     
      </div>
    </div>
  )
}
