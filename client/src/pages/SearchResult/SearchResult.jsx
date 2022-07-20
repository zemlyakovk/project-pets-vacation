import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../store/actions/search.actions';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classes from './SearchResult.module.css'
import DatePicker from 'react-multi-date-picker';
import { Map, YMaps } from 'react-yandex-maps'
import MiniCardSitterMainPage from '../MiniCardSitterMainPage';
import "./styles.css";
import CardModalWindow from '../../components/CardModalWindow/CardModalWindow';

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

export default function SearchResult() {
  const { value,
    // error,
    isLoading } = useSelector((state) => state.search)
  const dispatch = useDispatch();
  const { state } = useLocation()
  const [valueInput, setValueInput] = useState({ ...state, hasPetFlag: false, hasChild: false, supervision: false, experience: 1, housingType: 'Квартира', pricePerDay: 0, pricePerHour: 0, petSyze: '', petAge: '' });
  const [users, setUsers] = useState([]);

  const changeRadioHandler = (event) => {
    setValueInput({ ...valueInput, radioValue: event.target.value });
    dispatch(search(valueInput))
  };

  const changeTextHandler = (event) => {
    setValueInput({ ...valueInput, textValue: event });
  };

  const handleChange = (event) => {
    setValueInput({ ...valueInput, serviceType: event.target.value });
  };

  const hasPetEtcHandler = (e) => {
    if (e.target.name === 'has_pet_flag') {
      setValueInput((prev) => ({ ...prev, hasPetFlag: !prev.hasPetFlag }));
    } else if (e.target.name === 'has_child') {
      setValueInput((prev) => ({ ...prev, hasChild: !prev.hasChild }));
    } else if (e.target.name === 'supervision_24') {
      setValueInput((prev) => ({ ...prev, supervision: !prev.supervision }));
    } else if (e.target.name === 'housing_type') {
      setValueInput((prev) => ({ ...prev, housingType: e.target.value }));
    } else if (e.target.name === 'small') {
      setValueInput((prev) => ({ ...prev, petSyze: e.target.name }));
    } else if (e.target.name === 'medium') {
      setValueInput((prev) => ({ ...prev, petSyze: e.target.name }));
    } else if (e.target.name === 'large') {
      setValueInput((prev) => ({ ...prev, petSyze: e.target.name }));
    } else if (e.target.name === 'puppy') {
      setValueInput((prev) => ({ ...prev, petAge: e.target.name }));
    } else if (e.target.name === 'adult') {
      setValueInput((prev) => ({ ...prev, petAge: e.target.name }));
    } else if (e.target.name === 'old') {
      setValueInput((prev) => ({ ...prev, petAge: e.target.name }));
    } else if (e.target.name === 'experience') {
      if (e.target.value === '1') {
        setValueInput((prev) => ({ ...prev, experience: 1 }));
      } else if (e.target.value === '2') {
        setValueInput((prev) => ({ ...prev, experience: 2 }));
      } else if (e.target.value === '3') {
        setValueInput((prev) => ({ ...prev, experience: 3 }));
      } else if (e.target.value === '4') {
        setValueInput((prev) => ({ ...prev, experience: 4 }));
      } else if (e.target.value === '5') {
        setValueInput((prev) => ({ ...prev, experience: 5 }));
      } else if (e.target.value === '6') {
        setValueInput((prev) => ({ ...prev, experience: 6 }));
      }
    } else if (e.target.name === 'pricePerDay') {
      if (e.target.value === '1') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 500 }));
      } else if (e.target.value === '2') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 700 }));
      } else if (e.target.value === '3') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 900 }));
      } else if (e.target.value === '4') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 1100 }));
      } else if (e.target.value === '5') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 1300 }));
      } else if (e.target.value === '6') {
        setValueInput((prev) => ({ ...prev, pricePerDay: 1500 }));
      }
    }
  };

  useEffect(() => {
    setUsers(() => value.filter((el) => el.Sitter.has_child === valueInput.hasChild))
  }, [value, valueInput.hasChild])

  useEffect(() => {
    setUsers(() => value.filter((el) => el.Sitter.supervision_24 === valueInput.supervision))
  }, [value, valueInput.supervision])

  useEffect(() => {
    setUsers(() => value.filter((el) => el.Sitter.housing_type === valueInput.housingType))
  }, [value, valueInput.housingType])

  useEffect(() => {
    setUsers(() => value.filter((el) => el.Sitter.has_pet_flag === valueInput.hasPetFlag))
  }, [value, valueInput.hasPetFlag])

  useEffect(() => {
    if (valueInput.pricePerDay === 1500) {
      setUsers(() => value.filter((el) => el.Sitter.price_per_day >= 0))
    } else {
      setUsers(() => value.filter((el) => el.Sitter.price_per_day >= valueInput.pricePerDay))
    }
  }, [value, valueInput.pricePerDay])

  useEffect(() => {
    if (valueInput.experience === 6) {
      setUsers(() => value.filter((el) => el.Sitter.experience >= 0))
    } else {
      setUsers(() => value.filter((el) => el.Sitter.experience >= valueInput.experience))
    }
  }, [value, valueInput.experience])

  useEffect(() => {
    if (value.length) {
      setUsers([...value]);
    }
  }, [value])

  const maState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  }


  const { auth: { id } } = useSelector((state) => state);

  const { sitters } = useSelector((state) => state);

  const [modalActive, setModalActive] = useState(true)

  return (
    <div className='container mx-auto'>
      <div className="mt-10 flex justify-center flex-wrap">
        <form method="POST" className='w-[70%] mt-10'>
          <div className="shadow overflow-hidden">
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
                  <AddressSuggestions
                    token="7e47857f6ca620ff5df72ae45b911b78fa0f61e4"
                    value={valueInput.textValue}
                    onChange={changeTextHandler} />
                </div>
              </div>

              <div className='flex flex-col justify-center max-w-xl h-5 items-baseline'>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 items-baseline">Даты передержки</label>
                <DatePicker className='border border-solid border-gray-300' value={[valueInput.dateFrom, valueInput.dateTo]}
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
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="flex col-span-2">
                  <div>
                    <div className="form-check">
                      <input className={classes.checkInput} checked={valueInput.hasPetFlag} type="checkbox" value='' onChange={hasPetEtcHandler} id="flexCheckHasPet" name="has_pet_flag" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasPet">
                        Есть собственный питомец
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput} checked={valueInput.hasChild} type="checkbox" value="" onChange={hasPetEtcHandler} id="flexCheckHasChild" name="has_child" />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasChild">
                        Есть дети
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput} checked={valueInput.supervision} type="checkbox" value="" onChange={hasPetEtcHandler} id="flexCheck24" name="supervision_24" />
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

                <label className="block text-left col-span-3">
                  <span className="text-gray-700">Размер питомца</span>
                  <ul className="grid gap-6 w-full md:grid-cols-3">
                    <li>
                      <input type="checkbox" id="small" name='small' checked={valueInput.petSyze === 'small'} onChange={hasPetEtcHandler} className="hidden peer" required="" />
                      <label for="small" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Маленький</div>
                          <div className="w-full text-sm">от 1 до 10 кг</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="medium" name='medium' checked={valueInput.petSyze === 'medium'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label for="medium" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Средний</div>
                          <div className="w-full text-sm">от 10 до 30 кг</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="large" name='large' checked={valueInput.petSyze === 'large'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label for="large" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Большой</div>
                          <div className="w-full text-sm">от 30 кг</div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </label>

                <label className="block text-left col-span-3">
                  <span className="text-gray-700">Возраст питомца</span>
                  <ul className="grid gap-6 w-full md:grid-cols-3">
                    <li>
                      <input type="checkbox" id="puppy" name='puppy' checked={valueInput.petAge === 'puppy'} onChange={hasPetEtcHandler} className="hidden peer" required="" />
                      <label for="puppy" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Щенок</div>
                          <div className="w-full text-sm">до 1 года</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="adult" name='adult' checked={valueInput.petAge === 'adult'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label for="adult" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Взрослый</div>
                          <div className="w-full text-sm">от 1 до 7 лет</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="old" name='old' checked={valueInput.petAge === 'old'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label for="old" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Старый</div>
                          <div className="w-full text-sm">от 7 лет</div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </label>

                <div className="flex flex-col space-y-2 p-2 w-80 col-span-3">
                  <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Опыт присмотра (лет)</label>
                  <input type="range" name='experience' className="w-full" min="1" max="6" step="1" oninput={valueInput.experience} onChange={hasPetEtcHandler} />
                  <ul className="flex justify-between w-full px-[10px]">
                    <li className="flex justify-center relative"><span className="absolute">1</span></li>
                    <li className="flex justify-center relative"><span className="absolute">2</span></li>
                    <li className="flex justify-center relative"><span className="absolute">3</span></li>
                    <li className="flex justify-center relative"><span className="absolute">4</span></li>
                    <li className="flex justify-center relative"><span className="absolute">5</span></li>
                    <li className="flex justify-center relative"><span className="absolute">Более 5 лет</span></li>
                  </ul>
                </div>

                <div className="flex flex-col space-y-2 p-2 w-80 col-span-3">
                  <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Цена за сутки</label>
                  <input type="range" name='pricePerDay' className="w-full" min="1" max="6" step="1" oninput={valueInput.pricePerDay} onChange={hasPetEtcHandler} />
                  <ul className="flex justify-between w-full px-[10px]">
                    <li className="flex justify-center relative"><span className="absolute">Менее 500</span></li>
                    <li className="flex justify-center relative"><span className="absolute">700</span></li>
                    <li className="flex justify-center relative"><span className="absolute">900</span></li>
                    <li className="flex justify-center relative"><span className="absolute">1100</span></li>
                    <li className="flex justify-center relative"><span className="absolute">1300</span></li>
                    <li className="flex justify-center relative"><span className="absolute">Любая</span></li>
                  </ul>
                </div>

                <div className="flex flex-col space-y-2 p-2 w-80 col-span-3">
                  <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Цена за час</label>
                  <input type="range" className="w-full" min="1" max="6" step="1" />
                  <ul className="flex justify-between w-full px-[10px]">
                    <li className="flex justify-center relative"><span className="absolute">Менее 200</span></li>
                    <li className="flex justify-center relative"><span className="absolute">300</span></li>
                    <li className="flex justify-center relative"><span className="absolute">400</span></li>
                    <li className="flex justify-center relative"><span className="absolute">500</span></li>
                    <li className="flex justify-center relative"><span className="absolute">600</span></li>
                    <li className="flex justify-center relative"><span className="absolute">Любая</span></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </form >
        <div className='cardsListGrid'>
          <div className="flexCol">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 col-span-1">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>

            ) : //MiniCardSitter()
              <div className='flex col-span-1 flex-wrap'>
                {sitters && sitters.map((sitter) =>
                  <MiniCardSitterMainPage key={sitter.id}  {...sitter} />
                )}
              </div>
            }
          </div >
          <div className="map">
            <YMaps >
              <Map defaultState={maState}></Map>
            </YMaps>
          </div>
        </div>

      </div>
      <CardModalWindow active={modalActive} setActive={setModalActive}/>
    </div>
  )
}
