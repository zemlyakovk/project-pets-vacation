import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../store/actions/search.actions';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classes from './SearchResult.module.css'
import DatePicker from 'react-multi-date-picker';
import { Map, YMaps, Placemark, ZoomControl } from 'react-yandex-maps'
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
  const { value: sitters,
    // error,
    isLoading } = useSelector((state) => state.search)
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [valueInput, setValueInput] = useState({ ...state, hasPetFlag: false, hasChild: false, supervision: false, experience: 1, housingType: 'Квартира', pricePerDay: 0, pricePerHour: 0, petSyze: '', petAge: '' });
  // const [users, setUsers] = useState([]);
  const mapRef = useRef();
  const [ymap, setYmap] = useState();

  const changeRadioHandler = (event) => {
    setValueInput({ ...valueInput, radioValue: event.target.value });
    dispatch(search(valueInput))
  };

  const changeTextHandler = (address) => {
    setValueInput({ ...valueInput, address: address });
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

  function updateSearch(distance, center) {
    dispatch(search({ ...valueInput, distance, latitude: center[0], longitude: center[1] }))
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.events.add('boundschange', (e) => {
        const newBounds = e.originalEvent.newBounds;
        const distance = ymap.coordSystem.geo.getDistance(newBounds[0], newBounds[1]) / 2500;
        updateSearch(distance, e.originalEvent.newCenter);
      });
    }
  }, [ymap])

  // useEffect(() => {
  //   setUsers(() => value.filter((el) => el.Sitter.has_child === valueInput.hasChild))
  // }, [value, valueInput.hasChild])

  // useEffect(() => {
  //   setUsers(() => value.filter((el) => el.Sitter.supervision_24 === valueInput.supervision))
  // }, [value, valueInput.supervision])

  // useEffect(() => {
  //   setUsers(() => value.filter((el) => el.Sitter.housing_type === valueInput.housingType))
  // }, [value, valueInput.housingType])

  // useEffect(() => {
  //   setUsers(() => value.filter((el) => el.Sitter.has_pet_flag === valueInput.hasPetFlag))
  // }, [value, valueInput.hasPetFlag])

  // useEffect(() => {
  //   if (valueInput.pricePerDay === 1500) {
  //     setUsers(() => value.filter((el) => el.Sitter.price_per_day >= 0))
  //   } else {
  //     setUsers(() => value.filter((el) => el.Sitter.price_per_day >= valueInput.pricePerDay))
  //   }
  // }, [value, valueInput.pricePerDay])

  // useEffect(() => {
  //   if (valueInput.experience === 6) {
  //     setUsers(() => value.filter((el) => el.Sitter.experience >= 0))
  //   } else {
  //     setUsers(() => value.filter((el) => el.Sitter.experience >= valueInput.experience))
  //   }
  // }, [value, valueInput.experience])

  // useEffect(() => {
  //   if (value.length) {
  //     setUsers([...value]);
  //   }
  // }, [value])
  return (
    <div className='flex justify-center items-center min-h-full mt-10'>
      <div className="mx-auto w-5/6">
        <form>
          <div className="shadow rounded-t-xl">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className='grid grid-cols-4 gap-4'>
                <div className='flex justify-center col-span-2 col-start-2'>
                  <div className='m-1'>
                    <label className=' text-gray-700' htmlFor="dog">
                      <input className='m-1 hidden peer' type="radio" id="dog" name="type" value="Собака" checked={valueInput.radioValue === "Собака"} />
                      <div className={`${classes.radioChecked} peer-checked:opacity-100 peer-checked:border-teal-100`}>
                        <img className='w-3/4' src={`${process.env.REACT_APP_STATIC_URL}icons8-dog-100.png`} alt="Собака" />
                        <span>Собака</span>
                      </div>
                    </label>
                  </div>
                  <div className='m-1'>
                    <label className=' text-gray-700' htmlFor="cat">
                      <input className='peer m-1 hidden' type="radio" id="cat" name="type" value="Кошка" checked={valueInput.radioValue === "Кошка"} />
                      <div className={`${classes.radioChecked} peer-checked:opacity-100 peer-checked:border-teal-100`}>
                        <img className='w-3/4' src={`${process.env.REACT_APP_STATIC_URL}icons8-cat-100.png`} alt="Кошка" />
                        <span>Кошка</span>
                      </div>
                    </label>
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
                    count='5'
                    filterFromBound='city'
                    filterToBound='house'
                    onChange={changeTextHandler} />
                </div>

                <div className='flex flex-col justify-center col-span-1'>
                  <label htmlFor="date" className="block mb-2 text-gray-700 items-baseline">Даты передержки</label>
                  <DatePicker value={[valueInput.dateFrom, valueInput.dateTo]}
                    onChange={(date) => setValueInput({
                      ...valueInput, dateFrom: `${date[0].day}-${date[0].month}-${date[0].year}`,
                      dateTo: `${date[1]?.day}-${date[1]?.month}-${date[1]?.year}`
                    })}
                    multiple={true}
                    numberOfMonths={2}
                    minDate={new Date()}
                    maxDate={new Date().setDate(90)}
                    format="DD.MM.YYYY"
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
                  <label htmlFor="countries" className="block mb-2 text-gray-700 items-baseline">Тип услуги</label>
                  <select id="countries" value={valueInput.serviceType} onChange={handleChange} className={classes.formControl}>
                    <option value="Передержка">Передержка</option>
                    <option value="Выгул">Выгул</option>
                  </select>
                </div>
                <div className='flex justify-end col-span-1 col-end-5'>
                  <button type='submit' className={classes.button}>Найти ситтера</button>
                </div>
                {/* <div className="px-6 py-5 bg-white sm:p-6">
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
                </div> */}

                {/* <label className="block text-left col-span-3">
                  <span className="text-gray-700">Размер питомца</span>
                  <ul className="grid gap-6 w-full md:grid-cols-3">
                    <li>
                      <input type="checkbox" id="small" name='small' checked={valueInput.petSyze === 'small'} onChange={hasPetEtcHandler} className="hidden peer" required="" />
                      <label htmlFor="small" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Маленький</div>
                          <div className="w-full text-sm">от 1 до 10 кг</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="medium" name='medium' checked={valueInput.petSyze === 'medium'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label htmlFor="medium" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Средний</div>
                          <div className="w-full text-sm">от 10 до 30 кг</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="large" name='large' checked={valueInput.petSyze === 'large'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label htmlFor="large" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Большой</div>
                          <div className="w-full text-sm">от 30 кг</div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </label> */}

                {/* <label className="block text-left col-span-3">
                  <span className="text-gray-700">Возраст питомца</span>
                  <ul className="grid gap-6 w-full md:grid-cols-3">
                    <li>
                      <input type="checkbox" id="puppy" name='puppy' checked={valueInput.petAge === 'puppy'} onChange={hasPetEtcHandler} className="hidden peer" required="" />
                      <label htmlFor="puppy" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Щенок</div>
                          <div className="w-full text-sm">до 1 года</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="adult" name='adult' checked={valueInput.petAge === 'adult'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label htmlFor="adult" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Взрослый</div>
                          <div className="w-full text-sm">от 1 до 7 лет</div>
                        </div>
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" id="old" name='old' checked={valueInput.petAge === 'old'} onChange={hasPetEtcHandler} className="hidden peer" />
                      <label htmlFor="old" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                          <div className="w-full text-lg font-semibold">Старый</div>
                          <div className="w-full text-sm">от 7 лет</div>
                        </div>
                      </label>
                    </li>
                  </ul>
                </label> */}

                {/* <div className="flex flex-col space-y-2 p-2 w-80 col-span-3">
                  <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Опыт присмотра (лет)</label>
                  <input type="range" name='experience' className="w-full" min="1" max="6" step="1" onInput={valueInput.experience} onChange={hasPetEtcHandler} />
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
                  <input type="range" name='pricePerDay' className="w-full" min="1" max="6" step="1" onInput={valueInput.pricePerDay} onChange={hasPetEtcHandler} />
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
                </div> */}
              </div>
            </div>
          </div>
          <div id="accordionExample5">
            <div className="bg-white rounded-b-xl shadow-[0_3px_3px_0_rgba(0,0,0,0.1)]">
              {/* box-shadow:       shadow-[0px_9px_16px_0px_rgba(0 0 0 / 0.1)]  0px 9px 16px 0px rgba(50, 50, 50, 0.85); */}
              <button className={classes.collBtn} type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne5"
                aria-expanded="true"
                aria-controls="collapseOne5">
                <label htmlFor="check">
                  <input type="checkbox" id='check' className="hidden peer" />
                  <div className='hover:text-teal-500 hover:opacity-70 peer-checked:hidden cursor-pointer text-gray-700'>
                    <span className='mr-3 text-xs '>&#9660;</span>
                    <span>Дополнительные фильтры</span>
                  </div>
                  <div className='hover:text-teal-500 hover:opacity-70 hidden peer-checked:block cursor-pointer text-gray-700'>
                    <span className='mr-3 text-xs'>&#9650;</span>
                    <span>Скрыть фильтры</span>
                  </div>
                </label>
              </button>
              <div id="collapseOne5" className="accordion-collapse collapse" aria-labelledby="headingOne5">
                <div className="py-4 px-5">
                  <div className='grid grid-cols-4 gap-4'>
                    <div className="flex flex-col space-y-2 p-2 col-span-2">
                      <label htmlFor="priceHour" className="form-label inline-block mb-2 text-gray-700">Максимальная цена за час</label>
                      <input type="range" id="priceHour" className="w-full accent-teal-200 cursor-pointer" min="100" max="1000" step="100" />
                    </div>
                    <div className="flex flex-col space-y-2 p-2 col-span-2">
                      <label htmlFor="priceDay" className="form-label inline-block mb-2 text-gray-700">Максимальная цена за сутки</label>
                      <input type="range" id="priceDay" className="w-full accent-teal-200 cursor-pointer" min="100" max="2000" step="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form >
        <div className='grid grid-cols-2 mt-3'>
          <div className="col-span-1 overflow-scroll">
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
          </div>
          <div className='col-span-1'>
            <YMaps className='mapBox col-span-2' query={{ apikey: '5aa9357e-d3dd-4bd8-a386-c1b9aed33f24' }}>
              <Map
                modules={["geocode", "coordSystem.geo"]}
                onLoad={(ymaps) => {
                  setYmap(ymaps);
                }}
                defaultState={{
                  center: [valueInput.address.data.geo_lat, valueInput.address.data.geo_lon],
                  zoom: valueInput.address.data.street || valueInput.address.data.settlement ? 13 : 10
                }} width='100%' height='100%' instanceRef={ref => {
                  if (ref) {
                    mapRef.current = ref
                  }
                }}>
                {sitters.map((sitter, i) => (
                  <Placemark
                    key={'placemark#' + i}
                    geometry={[sitter.Address.latitude, sitter.Address.longitude]}
                    properties={{
                      balloonContentHeader: `${sitter.User.first_name}, ${sitter.Address.city || sitter.Address.settlement}, ${sitter.Address.street}`,
                      balloonContentBody: sitter.title,

                    }}
                    modules={
                      ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                    options={{
                      draggable: true,
                      iconLayout: 'default#image',
                      iconImageHref: `${process.env.REACT_APP_STATIC_URL}icons8-place-marker-100.png`,
                      iconImageSize: [42, 42],
                    }} />
                ))}
                <ZoomControl />
              </Map>
            </YMaps>
          </div>
        </div >

      </div >

    </div >



  )
}

  // {/* <CardModalWindow active={modalActive} setActive={setModalActive}/> */ }
