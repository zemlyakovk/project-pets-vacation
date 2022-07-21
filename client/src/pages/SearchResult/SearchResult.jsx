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

export default function SearchResult() {
  const { value: sitters,
    // error,
    isLoading } = useSelector((state) => state.search)
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [valueInput, setValueInput] = useState({ ...state, noPet: false, noChild: false, supervision_24: false, experience: '0', housing_type: 'Любой', price_per_day: '2100', price_per_hour: '1100', sitter_pet_sizes: [], sitter_pet_ages: [] });
  // const [users, setUsers] = useState([]);
  const mapRef = useRef();
  const [ymap, setYmap] = useState();

  const changeRadioHandler = (event) => {
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

  const handleChange = (event) => {
    setValueInput({ ...valueInput, [event.target.name]: event.target.value });
  };

  function petSizeHandler(event) {
    console.log(event.target.name);
    setValueInput((prev) => {
      switch (event.target.name) {
        case 'small':
          if (prev.sitter_pet_sizes.includes('Маленький')) {
            return { ...prev, sitter_pet_sizes: prev.sitter_pet_sizes.filter(el => el !== 'Маленький') }
          }
          return { ...prev, sitter_pet_sizes: [...prev.sitter_pet_sizes, 'Маленький'] }
        case 'medium':
          if (prev.sitter_pet_sizes.includes('Средний')) {
            return { ...prev, sitter_pet_sizes: prev.sitter_pet_sizes.filter(el => el !== 'Средний') }
          }
          return { ...prev, sitter_pet_sizes: [...prev.sitter_pet_sizes, 'Средний'] }
        case 'large':
          if (prev.sitter_pet_sizes.includes('Большой')) {
            return { ...prev, sitter_pet_sizes: prev.sitter_pet_sizes.filter(el => el !== 'Большой') }
          }
          return { ...prev, sitter_pet_sizes: [...prev.sitter_pet_sizes, 'Большой'] }
        default:
          return { ...prev }
      }
    })
  }
  function petAgeHandler(event) {
    console.log(event.target.name);
    setValueInput((prev) => {
      switch (event.target.name) {
        case 'child':
          if (prev.sitter_pet_ages.includes('Щенок')) {
            return { ...prev, sitter_pet_ages: prev.sitter_pet_ages.filter(el => el !== 'Щенок') }
          }
          return { ...prev, sitter_pet_ages: [...prev.sitter_pet_ages, 'Щенок'] }
        case 'adult':
          if (prev.sitter_pet_ages.includes('Взрослый')) {
            return { ...prev, sitter_pet_ages: prev.sitter_pet_ages.filter(el => el !== 'Взрослый') }
          }
          return { ...prev, sitter_pet_ages: [...prev.sitter_pet_ages, 'Взрослый'] }
        case 'old':
          if (prev.sitter_pet_ages.includes('Старый')) {
            return { ...prev, sitter_pet_ages: prev.sitter_pet_ages.filter(el => el !== 'Старый') }
          }
          return { ...prev, sitter_pet_ages: [...prev.sitter_pet_ages, 'Старый'] }
        default:
          return { ...prev }
      }
    })
  }

  //* Обработчик для чекбоксов
  function onChangeCheckHendler(event) {
    setValueInput((prev) => ({ ...prev, [event.target.name]: !prev[event.target.name] }))
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(search(valueInput))
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.events.add('boundschange', (e) => {
        const newBounds = e.originalEvent.newBounds;
        const distance = ymap.coordSystem.geo.getDistance(newBounds[0], newBounds[1]) / 2500;
        dispatch(search({ ...valueInput, distance, latitude: e.originalEvent.newCenter[0], longitude: e.originalEvent.newCenter[1] }))
      });
    }
  }, [ymap, valueInput, dispatch])

  return (
    <div className='flex justify-center items-center min-h-full mt-10'>
      <div className="mx-auto w-5/6">
        <form onSubmit={submitHandler}>
          <div className="shadow rounded-t-xl">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className='grid grid-cols-4 gap-4'>
                <div className='flex justify-center col-span-2 col-start-2'>
                  <div className='m-1'>
                    <label className=' text-gray-700' htmlFor="dog">
                      <input className='m-1 hidden peer' type="radio" id="dog" name="type" value="Собака" checked={valueInput.radioValue === "Собака"} onChange={changeRadioHandler} />
                      <div className={`${classes.radioChecked} peer-checked:opacity-100 peer-checked:border-teal-100`}>
                        <img className='w-3/4' src={`${process.env.REACT_APP_STATIC_URL}icons8-dog-100.png`} alt="Собака" />
                        <span>Собака</span>
                      </div>
                    </label>
                  </div>
                  <div className='m-1'>
                    <label className=' text-gray-700' htmlFor="cat">
                      <input className='peer m-1 hidden' type="radio" id="cat" name="type" value="Кошка" checked={valueInput.radioValue === "Кошка"} onChange={changeRadioHandler} />
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
                  <select id="countries" value={valueInput.serviceType} name="serviceType" onChange={handleChange} className={classes.formControl}>
                    <option value="Передержка">Передержка</option>
                    <option value="Выгул">Выгул</option>
                  </select>
                </div>
                <div className='flex justify-end col-span-1 col-end-5'>
                  <button type='submit' className={classes.button} >Найти ситтера</button>
                </div>
              </div>
            </div>
          </div>
          <div id="accordionExample5">
            <div className="bg-white rounded-b-xl shadow-[0_3px_3px_0_rgba(0,0,0,0.1)]">
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
                    <div className="col-span-2">
                      <span className="form-label inline-block mb-2 text-gray-700">Возраст питомца</span>
                      <ul className="w-full flex justify-start">
                        <li>
                          <input type="checkbox" id="child" name='child' className="hidden peer" onChange={petAgeHandler} checked={valueInput.sitter_pet_ages.includes('Щенок')} />
                          <label htmlFor="child" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center">
                              <div className="w-full text-lg font-semibold">Малыш</div>
                              <div className="w-full text-sm">до 1 года</div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" id="adult" name='adult' className="hidden peer" onChange={petAgeHandler} checked={valueInput.sitter_pet_ages.includes('Взрослый')} />
                          <label htmlFor="adult" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center ">
                              <div className="w-full text-lg font-semibold">Взрослый</div>
                              <div className="w-full text-sm">от 1 до 7 лет</div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" id="old" name='old' className="hidden peer" onChange={petAgeHandler} checked={valueInput.sitter_pet_ages.includes('Старый')} />
                          <label htmlFor="old" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center ">
                              <div className="w-full text-lg font-semibold">Старенький</div>
                              <div className="w-full text-sm">от 7 лет</div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-2">
                      <span className="form-label inline-block mb-2 text-gray-700">Размер питомца</span>
                      <ul className="w-full flex justify-start">
                        <li>
                          <input type="checkbox" id="small" name='small' className="hidden peer" onChange={petSizeHandler} checked={valueInput.sitter_pet_sizes.includes('Маленький')} />
                          <label htmlFor="small" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center">
                              <div className="w-full text-lg font-semibold">Маленький</div>
                              <div className="w-full text-sm">от 1 до 10 кг</div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" id="medium" name='medium' className="hidden peer" onChange={petSizeHandler} checked={valueInput.sitter_pet_sizes.includes('Средний')} />
                          <label htmlFor="medium" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center ">
                              <div className="w-full text-lg font-semibold">Средний</div>
                              <div className="w-full text-sm">от 10 до 30 кг</div>
                            </div>
                          </label>
                        </li>
                        <li>
                          <input type="checkbox" id="large" name='large' className="hidden peer" onChange={petSizeHandler} checked={valueInput.sitter_pet_sizes.includes('Большой')} />
                          <label htmlFor="large" className={`${classes.groupCheck} peer-checked:bg-teal-600 peer-checked:opacity-40 peer-checked:text-white`}>
                            <div className="flex flex-col justify-center items-center ">
                              <div className="w-full text-lg font-semibold">Большой</div>
                              <div className="w-full text-sm">от 30 кг</div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                    {valueInput.serviceType === 'Передержка' &&
                      <div className="flex flex-col space-y-2 p-2 col-span-2">
                        <label htmlFor="priceDay"
                          className="form-label inline-block mb-2 text-gray-700">
                          {`Максимальная цена за передержку (сутки): ${valueInput.price_per_day === '2100' ? 'любая' : valueInput.price_per_day}`}
                        </label>
                        <input type="range"
                          id="priceDay"
                          name="price_per_day"
                          value={valueInput.price_per_day}
                          onChange={handleChange}
                          className="w-full accent-teal-200 cursor-pointer"
                          min="100"
                          max="2100"
                          step="100"
                        />
                      </div>}
                    {
                      valueInput.serviceType === 'Выгул' &&
                      <div className="flex flex-col space-y-2 p-2 col-span-2">
                        <label htmlFor="priceHour"
                          className="form-label inline-block mb-2 text-gray-700">
                          {`Максимальная цена за прогулку (час): ${valueInput.price_per_hour === '1100'
                            ? 'любая'
                            : valueInput.price_per_hour}`}
                        </label>
                        <input type="range"
                          id="priceHour"
                          name="price_per_hour"
                          value={valueInput.price_per_hour}
                          onChange={handleChange}
                          className="w-full accent-teal-200 cursor-pointer"
                          min="100"
                          max="1100"
                          step="100"
                        />
                      </div>
                    }
                    <div className="text-left col-span-2">
                      <label className="form-label inline-block mb-2 text-gray-700">Тип жилья для передержки</label>
                      <select className={classes.formControl} name="housing_type" value={valueInput.housing_type} onChange={handleChange}>
                        <option value="Любой">Любой</option>
                        <option value="Квартира">Квартира</option>
                        <option value="Частный дом">Частный дом</option>
                        <option value="Отель для питомцев">Отель для питомцев</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2 p-2 col-span-2">
                      <label htmlFor="experience" className="form-label inline-block mb-2 text-gray-700">{`Опыт ухода от (лет): ${valueInput.experience === '0' ? 'не важно' : valueInput.experience}`}</label>
                      <input type="range" id="experience" value={valueInput.experience} onChange={handleChange} name="experience" className="w-full accent-teal-200 cursor-pointer" min="0" max="10" step="1" />
                    </div>
                    <div className="flex flex-col justify-center col-span-2">
                      <span className="form-label inline-block mb-2 text-gray-700">Доп. параметры</span>
                      <div className="form-check form-switch">
                        <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-teal-200"
                          type="checkbox"
                          role="switch"
                          onChange={onChangeCheckHendler}
                          checked={valueInput.noPets}
                          name="noPet"
                          id="noPet" />
                        <label className="form-label inline-block mb-2 text-gray-700" htmlFor="noPet">Без своих питомцев</label>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-teal-200"
                          type="checkbox"
                          role="switch"
                          onChange={onChangeCheckHendler}
                          checked={valueInput.noChild}
                          name="noChild"
                          id="noChild"
                        />
                        <label className="form-label inline-block mb-2 text-gray-700" htmlFor="noChild">Без детей</label>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-teal-200"
                          type="checkbox"
                          role="switch"
                          onChange={onChangeCheckHendler}
                          checked={valueInput.supervision_24}
                          name="supervision_24"
                          id="supervision_24"
                        />
                        <label className="form-label inline-block mb-2 text-gray-700" htmlFor="supervision_24">Постоянный присмотр</label>
                      </div>
                    </div>
                    <div className='flex justify-end col-span-1 col-end-5'>
                      <button type='button' className={classes.button} onClick={submitHandler}>Применить фильтры</button>
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
            <YMaps className='col-span-2' query={{ apikey: '5aa9357e-d3dd-4bd8-a386-c1b9aed33f24' }}>
              <Map
                modules={["geocode", "coordSystem.geo"]}
                onLoad={(ymaps) => {
                  setYmap(ymaps);
                }}
                defaultState={{
                  center: [valueInput.address.data.geo_lat, valueInput.address.data.geo_lon],
                  zoom: valueInput.address.data.street || valueInput.address.data.settlement ? 13 : 10
                }} width='100%' height='600px' instanceRef={ref => {
                  if (ref) {
                    mapRef.current = ref
                  }
                }}>
                {sitters.map((sitter, i) => (
                  <Placemark
                    key={'placemark#' + i}
                    geometry={[sitter.Address.latitude, sitter.Address.longitude]}
                    properties={{
                      balloonContentHeader: `<img src="${process.env.REACT_APP_STATIC_URL}${sitter.User.profile_photo}" width="150" height="161"  />${sitter.User.first_name}, ${sitter.Address.city || sitter.Address.settlement}, ${sitter.Address.street}`,
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
