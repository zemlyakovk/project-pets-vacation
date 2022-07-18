import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import SitterProfileReviewCard from '../SitterProfileReviewCard/SitterProfileReviewCard'

export default function SitterProfileList() {
  const [reviewsList, setReviewsList] = useState([])

const getAllReviews =  async () => {
  const fetchReviews = await axios.get(`/reviews?id=${1}`)
  setReviewsList(fetchReviews.data)
}

useEffect(()=> {
  getAllReviews()
},[])
console.log(reviewsList);





  return (
    <div className=''>
      <div className=' h-52 bg-slate-400'>Блок с фотками</div>
      <div className=' h-32 bg-slate-600'>Описание</div>
      <div className=' h-32 bg-slate-500'>Детали
      </div>
      <div className=' h-32 bg-slate-800'>Местоположение</div>
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
