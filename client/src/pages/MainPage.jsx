import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useNavigate } from 'react-router-dom';

//{radioValue: 'Собака', 
// textValue: '123', 
// dateFrom: Wed Jul 06 2022 00:00:00 GMT+0300 (Москва, стандартное время), 
// dateTo: Wed Jul 13 2022 00:00:00 GMT+0300 (Москва, стандартное время), 
// serviceType: 'Передержка'}

export default function MainPage() {
  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState({ radioValue: '', textValue: '', dateFrom: null, dateTo: null, serviceType: 'Передержка' });

  const changeHandler = (event) => {
    setValueInput({ ...valueInput, radioValue: event.target.value });
  };

  const changeTextHandler = (event) => {
    console.log(event);
    setValueInput({ ...valueInput, textValue: event.value });
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log(valueInput);
    navigate('/search', { state: valueInput })
  }

  const handleChange = (event) => {
    setValueInput({ ...valueInput, serviceType: event.target.value });
  };

  return (
    <div className='container mx-auto'>
      <form onSubmit={submitHandler}>

        <div className='flex justify-center'>
          <div className='m-3'>
            <input className='m-1' type="radio" id="dog" name="type" value="Собака" checked={valueInput.radioValue === "Собака"} onChange={changeHandler} />
            <label htmlFor="dog">Собака</label>
          </div>
          <div className='m-3'>
            <input className='m-1' type="radio" id="cat" name="type" value="Кошка" checked={valueInput.radioValue === "Кошка"} onChange={changeHandler} />
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
            <DatePicker className='form-control block w-60 px-3  py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded
                          transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1'
              selected={valueInput.dateFrom}
              onChange={(date) => setValueInput({ ...valueInput, dateFrom: date })}
              selectsStart
              startDate={valueInput.dateFrom}
              endDate={valueInput.dateTo}
            />
            <p>По: </p>
            <DatePicker className='form-control block w-60 px-3  py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300 rounded
                          transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1'
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
        <div className='flex justify-center'>
          <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded'>Найти догситтера</button>
        </div>
      </form>
    </div>
  )
}
