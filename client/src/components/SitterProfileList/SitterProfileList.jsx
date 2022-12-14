import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios'
import { sitterSaga } from '../../store/sagas/sitter.saga';
import SitterProfileReviewCard from '../SitterProfileReviewCard/SitterProfileReviewCard'

export default function SitterProfileList({ sitter }) {
  const [reviewsList, setReviewsList] = useState([])
  // console.log('sssssssssssssssss',sitter);

  const params = useParams()

  const getAllReviews = async () => {
    const fetchReviews = await axios.get(`/reviews?id=${params.id}`)
    setReviewsList(fetchReviews.data)
  }

  useEffect(() => {
    getAllReviews()
  }, [])
  // console.log(reviewsList);

  const spec = {
    'Опыт присмотра (лет)': `${sitter?.experience}`,
    'Присмотрю за собакой': sitter?.dog_flag ? 'да' : 'нет',
    'Присмотрю за кошкой': sitter?.cat_flag ? 'да' : 'нет',
    'Условия содержания:': `${sitter?.housing_type}`,
    'Есть свои питомцы': sitter?.has_pet_flag ? 'да' : 'нет',
    'Выгул': sitter?.walking ? 'да' : 'нет',
    'Передержка': sitter?.staying ? 'да' : 'нет',
    'Постоянный присмотр': sitter?.supervision_24 ? 'да' : 'нет',
    'Есть дети': sitter?.has_child ? 'да' : 'нет',
    'Цена за сутки': `${sitter?.price_per_day}`,
    'Цена за час': `${sitter?.price_per_hour}`,

  }



  return (
    <div className='rounded-lg shadow-lg bg-white w-1/2 m-3'>
      <div className=' h-52 '>
        <section className="overflow-hidden text-gray-700 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {sitter?.Sitter_images?.map(el => {
                return (<div className="flex flex-wrap w-1/4">
                  <div className="w-full p-1 md:p-2">
                    <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                      src={`${process.env.REACT_APP_STATIC_URL}${el.url}`} />
                  </div>
                </div>)
              })}


            </div>
          </div>
        </section>
      </div>
      <div className=' h-28 pl-8 mt-8 leading-6'>{sitter?.desc}</div>
      <span className='font-bold text-lg ml-8'>Детали</span>
      <div className=' h-40  flex flex-wrap justify-start pl-8'>
        {Object.keys(spec).map((el, index) => {
          return <div className='mr-4 mt-2 w-[150px]' key={index}>
            <div className=' text-gray-500'>{el} </div>
            <div>{spec[el]} </div>
          </div>
        })}
      </div>
      <div className='h-40  flex flex-wrap justify-start pl-8 mt-2'>
        <div className='mr-4 mt-2 w-[250px]' >
          <div className=' text-gray-500'>Возраст питомца </div>
          {sitter?.Pet_ages && sitter.Pet_ages.map(el => <div>{`${el.title} ${el.desc}`}</div>)}
        </div>
        <div className='mr-4 mt-2 w-[250px]' >
          <div className=' text-gray-500'>Размер питомца </div>
          {sitter?.Pet_sizes && sitter.Pet_sizes.map(el => <div>{`${el.title} ${el.desc}`}</div>)}
        </div>
      </div>
      {/* <div className=' h-32 bg-slate-200'>Местоположение</div> */}
      <div className='mt-2 ml-8 '>
        <span className='font-bold text-lg'>Отзывы о ситтере</span>
        {reviewsList?.map((el) => {
          return <SitterProfileReviewCard desc={el.desc} rating={el.rating} name={el.User.first_name}
            profile_photo={el.User.profile_photo} time={el.createdAt} key={el.id} />
        })}


      </div>
    </div>
  )
}
