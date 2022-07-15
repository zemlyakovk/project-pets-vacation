import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../store/actions/search.actions';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classes from './SearchResult.module.css'


export default function SearchResult() {
  const { value, error, isLoading } = useSelector((state) => state.search)
  const dispatch = useDispatch();
  const { state } = useLocation()
  const [valueInput, setValueInput] = useState({ ...state, hasPetFlag: false, hasChild: false, supervision: false, experience: 0, housingType: 'Квартира', pricePerDay: 0, petSyze: '', petAge: '' });
  console.log(valueInput.textValue);
  const changeRadioHandler = (event) => {
    setValueInput({ ...valueInput, radioValue: event.target.value });
  };

  const changeTextHandler = (event) => {
    console.log(event);
    setValueInput({ ...valueInput, textValue: event.value });
  };

  const handleChange = (event) => {
    setValueInput({ ...valueInput, serviceType: event.target.value });
  };

  const hasPetEtcHandler = (e) => {
    console.log(e.target.checked);
    console.log(e.target.name);
    if (e.target.name === 'has_pet_flag') {
      setValueInput({ ...valueInput, hasPetFlag: !e.target.checked });
    } else if (e.target.name === 'has_child') {
      setValueInput({ ...valueInput, hasChild: e.target.checked });
    } else if (e.target.name === 'supervision_24') {
      setValueInput({ ...valueInput, hasChild: e.target.checked });
    } else if (e.target.name === 'housing_type') {
      setValueInput({ ...valueInput, housingType: e.target.value });
    } else if (e.target.name === 'pet_size') {
      setValueInput({ ...valueInput, petSyze: e.target.value });
    } else if (e.target.name === 'pet_age') {
      setValueInput({ ...valueInput, petAge: e.target.value });
    } else if (e.target.name === 'experience') {
      setValueInput({ ...valueInput, experience: e.target.value });
    } else if (e.target.name === 'price_per_day') {
      setValueInput({ ...valueInput, pricePerDay: e.target.value });
    }
    console.log(valueInput);
  };

  useEffect(() => {
    dispatch(search(state))
    // console.log(isLoading);
  }, [])

  return (
    <>
      <div className='container mx-auto'>
        <form>

          <div className='flex justify-center'>
            <div className='m-3'>
              <input className='m-1' type="radio" id="dog" name="type" value="Собака" checked={valueInput.radioValue === "Собака"} onChange={changeRadioHandler} />
              <label htmlFor="dog">Собака</label>
            </div>
            <div className='m-3'>
              <input className='m-1' type="radio" id="cat" name="type" value="Кошка" checked={valueInput.radioValue === "Кошка"} onChange={changeRadioHandler} />
              <label htmlFor="cat">Кошка</label>
            </div>
          </div>

          <div className='flex items-center justify-evenly'>
            <div className="flex">
              <div className="mb-3 xl:w-96">
                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Где искать?</label>
                <AddressSuggestions token="7e47857f6ca620ff5df72ae45b911b78fa0f61e4" value={valueInput.textValue} onChange={changeTextHandler} />
              </div>
            </div>

            <div className='flex justify-center max-w-xl h-5 items-baseline'>
              <p>С: </p>
              <DatePicker className={classes.date} id='exampleFormControlInput1'
                selected={valueInput.dateFrom}
                onChange={(date) => setValueInput({ ...valueInput, dateFrom: date })}
                selectsStart
                startDate={valueInput.dateFrom}
                endDate={valueInput.dateTo}
              />
              <p>По: </p>
              <DatePicker className={classes.date} id="exampleFormControlInput1"
                selected={valueInput.dateTo}
                onChange={(date) => setValueInput({ ...valueInput, dateTo: date })}
                selectsEnd
                startDate={valueInput.dateFrom}
                endDate={valueInput.dateTo}
                minDate={valueInput.dateFrom}
              />
            </div>

            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 items-baseline">Тип услуги</label>
              <select id="countries" value={valueInput.serviceType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Передержка">Передержка</option>
                <option value="Выгул">Выгул</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-10 flex justify-center ">
        <form method="POST" className='w-[70%] mt-10'>
          <div className="shadow overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="flex col-span-2">
                  <div>
                    <div className="form-check">
                      <input className={classes.checkInput} type="checkbox" value='' onChange={hasPetEtcHandler} id="flexCheckHasPet" name="has_pet_flag" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasPet">
                        Есть собственный питомец
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput} type="checkbox" value="" onChange={hasPetEtcHandler} id="flexCheckHasChild" name="has_child" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasChild">
                        Есть дети
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput} type="checkbox" value="" onChange={hasPetEtcHandler} id="flexCheck24" name="supervision_24" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheck24">
                        Постоянный присмотр
                      </label>
                    </div>

                    <label className="block text-left col-span-1">
                      <span className="text-gray-700">Тип жилья</span>
                      <select className={classes.formControl} value={valueInput.housingType} onChange={hasPetEtcHandler} name="housing_type">
                        <option value="Квартира">Квартира</option>
                        <option value="Частный дом">Частный дом</option>
                      </select>
                    </label>

                  </div>
                </div>

                <label className="block text-left col-span-2">
                  <span className="text-gray-700">Размер питомца</span>
                  <select className={classes.formControl} onChange={hasPetEtcHandler} multiple name="pet_size">
                    <option>Маленький</option>
                    <option>Средний</option>
                    <option>Большой</option>
                  </select>
                </label>

                <label className="block text-left col-span-2">
                  <span className="text-gray-700">Возраст питомца</span>
                  <select className={classes.formControl} onChange={hasPetEtcHandler} multiple name="pet_age">
                    <option>Щенок</option>
                    <option>Взрослый</option>
                    <option>Старый</option>
                  </select>
                </label>

                <div className="flex col-span-1">
                  <div className="mb-3">
                    <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Опыт присмотра (лет)</label>
                    <input
                      onChange={hasPetEtcHandler}
                      type="number"
                      className={classes.formControl}
                      id="exampleNumber0"
                      name="experience"
                    />
                  </div>
                </div>

                <div className='col-span-2'>
                  <div className="mb-3">
                    <label htmlFor="priceDay" className="form-label inline-block mb-2 text-gray-700">Цена за сутки</label>
                    <input
                      onChange={hasPetEtcHandler}
                      type="number"
                      className={classes.formControl}
                      id="priceDay"
                      name="price_per_day"
                    />
                  </div>
                </div>

                <div className='col-span-2'>
                  <div className="mb-3">
                    <label htmlFor="priceHour" className="form-label inline-block mb-2 text-gray-700">Цена за час</label>
                    <input
                      onChange={hasPetEtcHandler}
                      type="number"
                      className={classes.formControl}
                      id="priceHour"
                      name="price_per_hour"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </form >
      </div >
    </>
  )
}
