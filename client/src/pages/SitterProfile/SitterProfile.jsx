import classes from './SitterProfile.module.css'


export default function SitterProfile() {


  return (
    <div className="mt-10 flex justify-center ">
      <form method="POST" className='w-[70%] mt-10'>
        <div className="shadow overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="flex col-span-2">
                <label className="block text-left">
                  <span className="text-gray-700">Присмотрю за</span>
                  <div className="form-check">
                    <input className={classes.checkInput} type="checkbox" value="" id="flexCheckDog" name="dog_flag" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDog">
                      Собакой
                    </label>
                  </div>
                  <div className="form-check">
                    <input className={classes.checkInput} type="checkbox" value="" id="flexCheckCat" name="cat_flag" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckCat" >
                      Кошкой
                    </label>
                  </div>
                </label>
              </div>
              <div className="flex col-span-3">
                <div>
                  <div className="form-check">
                    <input className={classes.checkInput} type="checkbox" value="" id="flexCheckHasPet" name="has_pet_flag" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasPet">
                      Есть собственный питомец
                    </label>
                  </div>
                  <div className="form-check">
                    <input className={classes.checkInput} type="checkbox" value="" id="flexCheckHasChild" name="has_child" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasChild">
                      Есть дети
                    </label>
                  </div>
                  <div className="form-check">
                    <input className={classes.checkInput} type="checkbox" value="" id="flexCheck24" name="supervision_24" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheck24">
                      Постоянный присмотр
                    </label>
                  </div>
                </div>
              </div>
              <label className="block text-left col-span-4">
                <span className="text-gray-700">Размер питомца</span>
                <select className={classes.formControl} multiple name="pet_size">
                  <option>Маленький</option>
                  <option>Средний</option>
                  <option>Большой</option>
                </select>
              </label>
              <div className="flex col-span-2">
                <div className="mb-3">
                  <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Опыт присмотра (лет)</label>
                  <input
                    type="number"
                    className={classes.formControl}
                    id="exampleNumber0"
                    name="experience"
                  />
                </div>
              </div>
              <label className="block text-left col-span-3">
                <span className="text-gray-700">Принимаемый возраст</span>
                <select className={classes.formControl} multiple name="pet_age">
                  <option>Щенок</option>
                  <option>Взрослый</option>
                  <option>Старый</option>
                </select>
              </label>
              <label className="block text-left col-span-5">
                <span className="text-gray-700">Тип жилья</span>
                <select className={classes.formControl} name="housing_type">
                  <option>Квартира</option>
                  <option>Частный дом</option>
                </select>
              </label>
              <div className='col-span-3'>
                <div className="form-check col-span-3">
                  <input className={classes.checkInput} type="checkbox" value="" id="flexCheckStay" name="staying" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckStay">
                    Передержка
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="priceDay" className="form-label inline-block mb-2 text-gray-700">Цена за сутки</label>
                  <input
                    type="number"
                    className={classes.formControl}
                    id="priceDay"
                    name="price_per_day"
                  />
                </div>
              </div>
              <div className='col-span-3'>
                <div className="form-check col-span-3">
                  <input className={classes.checkInput} type="checkbox" value="" id="flexCheckWalk" name="walking" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckWalk">
                    Выгул
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="priceHour" className="form-label inline-block mb-2 text-gray-700">Цена за час</label>
                  <input
                    type="number"
                    className={classes.formControl}
                    id="priceHour"
                    name="price_per_hour"
                  />

                </div>
              </div>
              <div className="col-span-10">
                <label htmlFor="personalInfo" className="block text-sm font-medium text-gray-700">Расскажите о себе</label>
                <textarea name="desc" rows={6} id="personalInfo" className={classes.formControl}></textarea>
              </div>
            </div>
          </div>
          <div className="px-4 py-3  text-right sm:px-6">
            <button type="submit" className={classes.button}>Сохранить</button>
          </div>
        </div>
      </form >
    </div >
  )
}
