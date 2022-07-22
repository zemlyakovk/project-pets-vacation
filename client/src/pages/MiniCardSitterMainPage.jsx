import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from '../axios/axios';
import CardModalWindow from '../components/CardModalWindow/CardModalWindow';
import { deleteFavorit, favorit } from '../store/actions/favorit.actions';




export default function MiniCardSitterMainPage
  ({ id, User: { first_name }, User: { last_name }, desc, User: { profile_photo } }) {

  const [modal, setModal] = useState({
    show: false
  });
  const [rating, setSitter] = useState()
  const dispatch = useDispatch();
  const location = useLocation()

  const getRatingAVG = () => {
    axios.get(`/sitters/rating/${id}`).then((data) => { setSitter(data.data.avg) })
  }

  useEffect(() => {
    if (id) {
      getRatingAVG()
    }
  }, [])

  function showModalHandler() {
    setModal((prev) => ({ ...prev, show: true, id }))
  }

  function clickHand() {
    if (location.pathname !== '/users/favorites') {
      dispatch(favorit(id))
    } else {
      dispatch(deleteFavorit(id))
    }
  }
  let descUpd = desc

  if (descUpd.length > 50) {
    descUpd = descUpd.slice(0, 50) + "..."
  }

  return (

    // <div>
    //   <div className=' relative'>
    //     <div className=' absolute top-3 left-[380px]'>
    //     <button onClick={showModalHandler} type="button" className=" bg-blue-500 text-white rounded-lg mt-2 py-2 text-center">Подробнее</button>
    //     </div>
    //   </div>



    // <Link target={'_blank'} to={`/sitters/${id}`}>
    <div className="flex mb-5">
      <div className="flex flexSitterCard flex-row rounded-lg bg-white shadow-lg">
        <div className=' flex items-center'>
          <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={`${process.env.REACT_APP_STATIC_URL}${profile_photo}`} alt="" />

        </div>
        <div className="p-4 flex flex-col justify-start">
          <div className='flex flex-row justify-between'>
            <h5 className="text-gray-900 text-xl font-medium">{first_name} {last_name}</h5>
            <button onClick={clickHand}><img src="/icons8-bookmark-30.png" alt="favorit" /></button>
          </div>

          <div className='text-gray-700 text-base' >г. Москва</div>
          <div className='flex flex-row'>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg> {rating ? Number(rating)?.toFixed(1) : <></>}
          </div>

          <p className="text-gray-700 text-base mb-1 text-sm">
            {descUpd}
          </p>

          <button onClick={showModalHandler} type="button" className=" bg-blue-500 text-white rounded-lg mt-2 py-2 text-center">Подробнее</button>


          <Link className=' bg-blue-500 text-white rounded-lg mt-2 py-2 text-center' to={`/sitters/${id}`}>
            Профиль ситтера
          </Link>
        </div>
      </div>

      {
        modal.show && <CardModalWindow setModal={setModal} id={id} />
      }




    </div>

    // </Link>



    // </div>

  )
}
