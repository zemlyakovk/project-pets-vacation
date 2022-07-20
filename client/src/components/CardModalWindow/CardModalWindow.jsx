import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { Navigation } from "swiper";





export default function CardModalWindow({ active, setActive }) {
  const [sitter, setSitter] = useState({ loading: true });
  const { id } = useParams();

  const navigate = useNavigate();




  useEffect(() => {
    fetch(`http://localhost:3100/allSitters/${id}`)
      .then(data => data.json())
      .then(data => setSitter({ loading: false, data }));
  }, [id]);

  console.log("sitter", sitter);



  return (<>
    {sitter.loading ? (
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
    ) : (



      <div onClick={() => setActive(false)} id="defaultModal" tabIndex="-1" className="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <img class="mr-4 w-12 h-12 rounded-full shadow-lg" src="https://previews.123rf.com/images/studiostoks/studiostoks1708/studiostoks170800063/84219839-round-avatar-icon-symbol-character-image-pop-art-retro-vector-illustration.jpg" alt="" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {sitter.data.User.first_name} {sitter.data.User.last_name}
              </h3>

              <button onClick={() => navigate(-1)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div class="max-w-lg bg-white rounded-lg  modalAvatar">
              <div class="flex flex-col items-center">

                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                  <SwiperSlide><img src="https://random.dog/7733c91a-ec61-4c50-b423-443ef6fedf6e.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img src="https://random.dog/0afd649d-ec06-403f-aeb5-0262d1750182.jpg" alt="" /></SwiperSlide>
                  <SwiperSlide><img src="https://media.nature.com/lw800/magazine-assets/d41586-022-01193-1/d41586-022-01193-1_20344900.jpg" alt="" /></SwiperSlide>
                </Swiper>
              </div>
              <div className="sitterInfo">
                <div class="flex flex-col items-left pb-2 mr-8">

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Принимает кошек</h5>
                  {sitter.data.cat_flag ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Принимает собак</h5>
                  {sitter.data.dog_flag ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Опыт в профессии </h5>
                  <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">{sitter.data.experience} года/лет</span>

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Доступность</h5>
                  {sitter.data.active ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                </div>
                <div class="flex flex-col items-left pb-2 mr-8">
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Домашние животные</h5>
                  {sitter.data.has_pet_flag ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Есть дети?</h5>
                  {sitter.data.has_child ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Готов смотреть:</h5>
                  {sitter.data.has_pet_flag ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Весь день</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Определенное время</span>}

                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Условия содержания:</h5>
                  <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">{sitter.data.housing_type}</span>


                </div>

                <div class="flex flex-col items-left pb-2 mr-8">
                  <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Готов выгуливать:</h5>
                  {sitter.data.walking ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  <div class="flex flex-col items-left pb-2 mr-8">
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Цена за день:</h5>
                    <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">{sitter.data.price_per_day} рублей</span>

                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Цена за час:</h5>
                    <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">{sitter.data.price_per_hour} рублей</span>

                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Остаюсь на ночь</h5>
                    {sitter.data.cat_flag ? <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Да</span> : <span class="mb-2 text-sm text-gray-500 dark:text-gray-400">Нет</span>}

                  </div>
                </div>

              </div>



              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button onClick={() => navigate(-1)} data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>

              </div>


            </div>

          </div>
        </div>
      </div>
    )}
  </>
  )
}

