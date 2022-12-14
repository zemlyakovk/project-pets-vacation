import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import Review from '../../pages/Review'
import { setChat } from '../../store/actions/chat.action';
import { Calendar } from 'react-multi-date-picker';
import classes from './SitterProfileCard.module.css'

export default function SitterProfileCard({ sitter }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const [dates, setDates] = useState([]);
  const [rating, setSitter] = useState()

  const getRatingAVG = () => {
    axios.get(`/sitters/rating/${sitter.id}`).then((data) => { setSitter(data.data.avg) })
  }

  async function startChat() {
    const response = await axios.get('/users/chat', {
      params: {
        user_1: auth.id,
        user_2: sitter.User.id
      }
    });
    dispatch(setChat({
      user_1: auth.id,
      user_2: sitter.User.id
    }))
    navigate(`/users/chat/${response.data.id}`)
  }
  useEffect(() => {
    if (sitter) {
      setDates(sitter.Sitter_dates.map(date => date.aval_date));
      getRatingAVG()
    }
  }, [sitter])

  return (
    <div class="flex justify-center mt-4 mr-2 h-[600px]">

      <div class="rounded-lg shadow-lg bg-white w-full">
        <div className='flex flex-row mt-2 ml-5 items-center'>
          <a href="#!">
            <img class="rounded-full w-[96px] h-[96px] object-cover" src={`${process.env.REACT_APP_STATIC_URL}${sitter?.User?.profile_photo}`} alt="" />
          </a>
          <div className='ml-5 '>
            <p className='mb-2 '>{sitter?.User?.first_name} {sitter?.User?.last_name}</p>
            <p className='mb-2 '>Возраст: {sitter?.User?.age} </p>
            {/* <p className=''>г Москва</p>  */}
          </div>
        </div>

        <div className="p-4 w-full">
          <button type="button" onClick={startChat} className="inline-flex
  justify-center
  py-2
  px-4
  border
  border-transparent
  shadow-sm
  rounded-md
  text-white
  bg-teal-400 opacity-70 hover:bg-teal-600 focus:bg-teal-600 active:bg-teal-700
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  mb-2">Написать ситтеру</button>
          <div><Review /></div>
          <div className='flex flex-row mt-2'>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
              {/* Общая оценка алгоритм подсчёта , сейчас хардкот*/}
            </svg>{rating ? Number(rating)?.toFixed(1) : <></>}
          </div >
          <p class="text-gray-700 text-base mb-4">{sitter?.title}
          </p>
          {/* <div className='col-span-4 flex items-center'> */}
          {/* </div> */}
          <Calendar
            value={dates}
            id="schedule"
            readOnly={true}
            shadow={false}
          />
        </div >
      </div >
    </div >
  )
}
