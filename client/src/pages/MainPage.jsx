import React, { useEffect, useState } from 'react'
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datepicker';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../store/actions/search.actions';
import { setSitters } from '../store/actions/people.action';
import MiniCardSitterMainPage from './MiniCardSitterMainPage';


//{radioValue: 'Собака',
// textValue: '123',
// dateFrom: Wed Jul 06 2022 00:00:00 GMT+0300 (Москва, стандартное время),
// dateTo: Wed Jul 13 2022 00:00:00 GMT+0300 (Москва, стандартное время),
// serviceType: 'Передержка'}

// функция для иконки календаря
function CustomRangeInput({ openCalendar, value }) {
  let from = value[0] || ""
  let to = value[1] || ""

  value = from && to ? "from " + from + ", to " + to : from

  return (
    <input
      onFocus={openCalendar}
      value={value}
      readOnly
    />
  )
}

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(search(valueInput))
    navigate('/search', { state: valueInput })
  }

  const handleChange = (event) => {
    setValueInput({ ...valueInput, serviceType: event.target.value });
  };

  const { auth: { id } } = useSelector((state) => state);

  const { sitters } = useSelector((state) => state);

  console.log('sitters', sitters);

  useEffect(() => {
    dispatch(setSitters())
  }, [dispatch])

  return (
    <>
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

            <div className='flex flex-col justify-center max-w-xl h-5 items-baseline'>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 items-baseline">Даты передержки</label>
              <DatePicker id="date" value={valueInput.dateFrom}
                onChange={(date) => setValueInput({
                  ...valueInput, dateFrom: `${date[0].year}-${date[0].month}-${date[0].day}`,
                  dateTo: `${date[1]?.year}-${date[1]?.month}-${date[1]?.day}`
                })}
                multiple={true}
                numberOfMonths={2}
                minDate={new Date()}
                maxDate={new Date().setDate(90)}
                render={<CustomRangeInput />}
                range />
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
      </div >
      <div className=' cardsFlex '>

        <ul className="collection">
          {/* {sitters && sitters.map((sitter) =>
        <MiniCardSitterMainPage key={sitter.id}  {...sitter} />
      )} */}

        </ul>


      </div>

    </>
  )
}


