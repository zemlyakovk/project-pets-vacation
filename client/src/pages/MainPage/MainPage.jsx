import React, { useEffect, useState } from 'react'
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datepicker';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import { useDispatch } from 'react-redux';
import { search } from '../../store/actions/search.actions';
import classes from './MainPage.module.css'


// функция для иконки календаря
function CustomRangeInput({ openCalendar, value }) {
  let from = value[0] || ""
  let to = value[1] || ""

  value = from && to ? "От " + from + ", до " + to : from

  return (
    <input
      onFocus={openCalendar}
      value={value}
      readOnly
      className='border border-solid border-gray-300 w-60'
      id='date'
    />
  )
}

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState({ radioValue: '', address: {}, dateFrom: null, dateTo: null, serviceType: 'Передержка' });

  const changeHandler = (event) => {
    setValueInput({ ...valueInput, radioValue: event.target.value });
  };

  const changeTextHandler = (address) => {
    setValueInput({
      ...valueInput,
      address: address,
      latitude: address.data.geo_lat,
      longitude: address.data.geo_lon,
      zoom: address.data.street || address.data.settlement ? 13 : 10,
      distance: address.data.street || address.data.settlement ? 5 : 30
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log(valueInput);
    dispatch(search(valueInput))
    navigate('/search', { state: valueInput })
  }

  const handleChange = (event) => {
    setValueInput({ ...valueInput, serviceType: event.target.value });
  };


  // useEffect(() => {
  //   dispatch(setSitters())
  // }, [dispatch])

  return (
    <>
      <div className='flex justify-center items-center min-h-full'>
        <div className='mx-auto overflow-hidden p-5 w-5/6'>
          <form onSubmit={submitHandler}>
            <div className="shadow overflow-hidden">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className='grid grid-cols-4 gap-4'>
                  <div className='flex justify-center col-span-2 col-start-2'>
                    <div className='m-3'>
                      <input className='m-1' type="radio" id="dog" name="type" value="Собака" checked={valueInput.radioValue === "Собака"} onChange={changeHandler} />
                      <label htmlFor="dog">Собака</label>
                    </div>
                    <div className='m-3'>
                      <input className='m-1' type="radio" id="cat" name="type" value="Кошка" checked={valueInput.radioValue === "Кошка"} onChange={changeHandler} />
                      <label htmlFor="cat">Кошка</label>
                    </div>
                  </div>


                  <div className="flex flex-col col-span-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Где искать?</label>
                    <AddressSuggestions
                      token="7e47857f6ca620ff5df72ae45b911b78fa0f61e4"
                      value={valueInput.address}
                      inputProps={{
                        placeholder: "Введите город, район или точный адрес",
                        className: `${classes.formControl}`,
                        id: 'street-address',
                        name: 'address',
                      }}
                      filterFromBound='city'
                      filterToBound='house'
                      onChange={changeTextHandler} />
                  </div>


                  <div className='flex flex-col justify-center col-span-1'>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 items-baseline">Даты передержки</label>
                    <DatePicker value={[valueInput.dateFrom, valueInput.dateTo]}
                      onChange={(date) => setValueInput({
                        ...valueInput, dateFrom: `${date[0].year}-${date[0].month}-${date[0].day}`,
                        dateTo: `${date[1]?.year}-${date[1]?.month}-${date[1]?.day}`
                      })}
                      multiple={true}
                      numberOfMonths={2}
                      minDate={new Date()}
                      maxDate={new Date().setDate(90)}
                      // render={<CustomRangeInput />}
                      range
                      style={{
                        display: 'block',
                        width: '100%',
                        paddingLeft: '0.75rem',
                        paddingRight: '0.75rem',
                        paddingTop: '0.375rem'
                      }}
                      inputClass={classes.formControl}
                    />
                  </div>
                  <div className='flex flex-col justify-center col-span-1'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 items-baseline">Тип услуги</label>
                    <select id="countries" value={valueInput.serviceType} onChange={handleChange} className={classes.formControl}>
                      <option value="Передержка">Передержка</option>
                      <option value="Выгул">Выгул</option>
                    </select>
                  </div>
                  <div className='flex justify-end col-span-1 col-end-5'>
                    <button type='submit' className='bg-teal-400 opacity-60 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded'>Найти ситтера</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div >
        <div className=' cardsFlex '>
        </div>
      </div>
    </>
  )
}


