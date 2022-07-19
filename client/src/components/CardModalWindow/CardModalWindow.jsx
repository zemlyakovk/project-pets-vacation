import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { Navigation } from "swiper";
// import { setSitters } from '../../store/actions/people.action';
// import { useDispatch, useSelector } from 'react-redux';




export default function CardModalWindow() {
  const [sitter, setSitter] = useState({ loading: true });
  const { id } = useParams();



  // const { sitters } = useSelector((state) => state);

  useEffect(() => {
    fetch(`http://localhost:3100/allSitters/${id}`)
      .then(data => data.json())
      .then(data => setSitter({ loading: false, data }));
  }, [id]);

  // console.log("sitter", sitter);
  // useEffect(() => {
  //   dispatch(setSitters())
  // }, [dispatch],[id])

  // console.log("sitters.desc", sitter.data.desc);


  return (<>
    {sitter.loading ?
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      :
      <div
        className="fixed top-0 left-0 w-screen h-screen z-50 bg-blue-800 bg-opacity-75 origin-center flex justify-center items-center appear-done enter-done"
      >
        <div
          className="bg-white w-11/12 max-w-md text-center pt-10 rounded-sm shadow-lg appear-done enter-done"
        >
          <div className="px-4 mb-4">
            <h2 className="text-3xl font-medium">{sitter.data.User.first_name} {sitter.data.User.last_name} </h2>
            <p>Ситтер</p>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              <SwiperSlide><img src="https://random.dog/7733c91a-ec61-4c50-b423-443ef6fedf6e.jpg" alt="" /></SwiperSlide>
              <SwiperSlide><img src="https://random.dog/0afd649d-ec06-403f-aeb5-0262d1750182.jpg" alt="" /></SwiperSlide>
              <SwiperSlide><img src="https://media.nature.com/lw800/magazine-assets/d41586-022-01193-1/d41586-022-01193-1_20344900.jpg" alt="" /></SwiperSlide>
            </Swiper>
            <div
              className="textContainerSitter max-w-full text-gray-800 "
            >
              {sitter.data.cat_flag ? <p>Принимает кошек</p> : <p>Не принимает кошек</p>}
              {sitter.data.dog_flag ? <p>Принимает собак</p> : <p>Не принимает собак</p>}
              <p>Опыт в профессии {sitter.data.experience} года/лет</p>
              {sitter.data.has_pet_flag ? <p>Есть домашнее животное</p> : <p>Нет домашних животных</p>}
              {sitter.data.has_child ? <p>Есть ребенок</p> : <p>Нет детей</p>}
              {sitter.data.supervision_24 ? <p>Готов присматривать весь день</p> : <p>Готов присматривать в опеределенные часы</p>}
              <p>Условия содержания:  {sitter.data.housing_type}</p>
              {sitter.data.walking ? <p>Готов выгуливать питомца</p> : <p>Не может выгуливать</p>}
              {sitter.data.staying ? <p>Готов оставаться на ночь</p> : <p>Не может готов оставаться на ночь</p>}
              <br />
              <p>Цена за день: {sitter.data.price_per_day} рублей</p>
              <p>Цена за час: {sitter.data.price_per_hour} рублей</p>
              <br />
              {sitter.data.active ? <p>Доступен</p> : <p>Не доступен</p>}
              <p>Дополнительная информация:  {sitter.data.desc}</p>
            </div>
          </div>



          <div>
            <label className="text-sm text-gray-600" htmlFor="bio"></label>
            {/* <textarea
              name="bio"
              className="w-full px-4 py-3 h-32 outline-none transition-colors duration-150 ease-in-out"
              spellCheck="false"
            ></textarea> */}
          </div>

          <div
            className="flex mt-10 justify-center py-4 px-4 border-t border-gray-300 false"
          >
            <div
              className="mx-4 w-full inline-block rounded-sm font-medium border border-solid cursor-pointer text-center text-base py-3 px-6 text-white bg-blue-400 border-blue-400 hover:bg-blue-600 hover:border-blue-600"
              type=""
            >
              <a href="/">Перейти в окно юзера</a>

            </div>
          </div>
        </div>
      </div>
    }
  </>
  )
}

