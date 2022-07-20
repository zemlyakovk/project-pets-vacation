import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import SitterProfileReviewCard from '../SitterProfileReviewCard/SitterProfileReviewCard'
import { useNavigate, useParams } from "react-router-dom";

export default function SitterProfileList() {
  const [reviewsList, setReviewsList] = useState([])
  const [sitter, setSitter] = useState({ loading: true });
  const { id } = useParams();
  console.log('=============================',id);

const getAllReviews =  async () => {
  const fetchReviews = await axios.get(`/reviews?id=${1}`)
  setReviewsList(fetchReviews.data)
}


// useEffect(() => {
//   fetch(`http://localhost:3100/allSitters/${id}`)
//     .then(data => data.json())
//     .then(data => setSitter({ loading: false, data }));
// }, [id]);


useEffect(()=> {
  getAllReviews()
},[])
console.log(reviewsList);

  const spec = {
    'Опыт присмотра (лет)':  'лет', 
    'Присмотрю за собакой' : true ? 'да' : 'нет',  
    'Присмотрю за кошкой' : false ? 'да' : 'нет',
    'Тип жилья' : 'да', 
    'Цена за сутки' : 'да',  
    'Размер питомца' : 'да',  
    'Возраст питомца' : 'да',  
    'Выгул' : 'да',  
    'Передержка' : 'да',  
    'Цена за час' : 'да',  
    'Возраст собак7' : 'да',  
  }



  return (
    <div className=' w-[760px]'>
      <div className=' h-52 bg-slate-200'>Блок с фотками</div>
      <div className=' h-32 bg-slate-400'>Описание</div>
      <span className='font-bold text-lg ml-8'>Детали</span>
      <div className=' h-40 bg-slate-100 flex flex-wrap justify-start pl-8'>
      {Object.keys(spec).map((el, index)=>{
        return <div className='mr-4 mt-2 w-[150px]' key={index}> 
                    <div className=' text-gray-500'>{el} </div> 
                    <div>{spec[el]} </div>
               </div>
      })}
      </div>
      <div className=' h-32 bg-slate-200'>Местоположение</div>
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
