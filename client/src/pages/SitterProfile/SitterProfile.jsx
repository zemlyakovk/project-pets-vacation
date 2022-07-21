import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import classes from './SitterProfile.module.css'
import { MultiSelect } from "react-multi-select-component";
import DatePicker from 'react-multi-date-picker';
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Icon from "react-multi-date-picker/components/icon"
import axios from '../../axios/axios';
import { setSitter } from '../../store/actions/sitter.action';
import { AddressSuggestions } from 'react-dadata';
import ModalMap from '../../components/ModalMap/ModalMap';
import ImagesUpload from '../../components/ImagesUpload/ImagesUpload';


export default function SitterProfile() {
  const { sitter } = useSelector(state => state);
  const [state, setState] = useState({});
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [dates, setDates] = useState([]);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const removedFilesNames = useRef([]);
  const [files, setFiles] = useState([]);

  const [map, setMap] = useState({
    show: false
  });


  useEffect(() => {
    setState((prev) => ({ ...prev, ...sitter.value }));
    if (sitter.value.Pet_ages) {
      setSelectedAge(sitter.value.Pet_ages.map(el => ({ label: `${el.title} ${el.desc}`, value: el.title, desc: el.desc })))
    }
    if (sitter.value.Pet_sizes) {
      setSelectedSize(sitter.value.Pet_sizes.map(el => ({ label: `${el.title} ${el.desc}`, value: el.title, desc: el.desc })))
    }
    if (sitter.value.Sitter_dates) {
      setDates(sitter.value.Sitter_dates.map(date => date.aval_date));
    }
    if (sitter.value.Sitter_images) {
      setImages(sitter.value.Sitter_images.map(file =>
      ({
        id: file.id,
        url: `${process.env.REACT_APP_STATIC_URL}${file.url}`,
        filename: file.url,
      })))
    }
  }, [sitter.value])
  //* Обработчик для инпутов
  function onChangeHendler(event) {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }
  //* Обработчик для чекбоксов
  function onChangeCheckHendler(event) {
    setState((prev) => ({ ...prev, [event.target.name]: !prev[event.target.name] }))
  }
  //* Для отслкживания изменения множественного выбора возрастов
  useEffect(() => {
    setState((prev) => ({ ...prev, Pet_ages: selectedAge.map(el => ({ title: el.value, desc: el.desc })) }))
  }, [selectedAge])
  //* Для отслкживания изменения множественного выбора размеров
  useEffect(() => {
    setState((prev) => ({ ...prev, Pet_sizes: selectedSize.map(el => ({ title: el.value, desc: el.desc })) }))
  }, [selectedSize])
  //* Для отслеживания расписания
  useEffect(() => {
    console.log('Dates====>', dates);
    setState((prev) => ({ ...prev, Sitter_dates: dates.map(date => ({ aval_date: `${date.year}-${date.month}-${date.day}` })) }))
  }, [dates])

  //! Сделать обработчик ошибок
  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      let body;
      let response;
      const data = new FormData();
      for (const single_file of files) {
        data.append('images', single_file)
      }
      if (files) {
        response = await axios.post(`/uploads`, data);
      }
      if (response.data) {
        body = { addFiles: response.data, removedFilesNames: removedFilesNames.current }
      }
      body = { ...body, state }
      console.log(body);
      if (state.id) {
        await axios.patch(`/sitters/${state.id}`, body);
        dispatch(setSitter());
      } else {
        await axios.post('/sitters/new', body);
        dispatch(setSitter());
      }
      removedFilesNames.current = [];
      setFiles([]);
    } catch (error) {
      console.log(error.message);
    }

  }
  //* Обновляем адрес в стейте
  useEffect(() => {
    if (address) {
      setState((prev) => ({
        ...prev,
        Address: {
          address: address.value,
          area: address.data.area_with_type,
          region: address.data.region_with_type,
          district: address.data.city_district_with_type,
          city: address.data.city_with_type,
          settlement: address.data.settlement_with_type,
          street: address.data.street_with_type,
          zip_code: address.data.postal_code,
          latitude: address.data.geo_lat,
          longitude: address.data.geo_lon

        }
      }))
    }
  }, [address])

  function showMapHandler() {
    const center = address.value ? [address.data.geo_lat, address.data.geo_lon] : [55.75396, 37.620393];
    setMap((prev) => ({ ...prev, show: true, center, zoom: 10 }))
  }

  return (
    <>
      <div className={`mt-10 flex justify-center ${sitter.isLoading && classes.loading}`}>
        <form onSubmit={onSubmitHandler} method="POST" className='w-[70%] mt-10'>
          <div className="shadow overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Карточка ситтера</label>
                  <hr />
                </div>
                <div className="col-span-4">
                  <label htmlFor="personalInfoShort" className="block text-sm font-medium text-gray-700">Краткое описание</label>
                  <textarea name="title"
                    rows={3}
                    id="personalInfoShort"
                    className={classes.formControl}
                    value={state?.title || ''}
                    onChange={onChangeHendler}>
                  </textarea>
                </div>
                <div className="col-span-4">
                  <label htmlFor="personalInfo" className="block text-sm font-medium text-gray-700">Расскажите о себе</label>
                  <textarea name="desc"
                    rows={6}
                    id="personalInfo"
                    className={classes.formControl}
                    value={state.desc}
                    onChange={onChangeHendler}>
                  </textarea>
                </div>
                <div className="col-span-4">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Адрес передержки</label>
                  {
                    state.Address &&
                    <AddressSuggestions
                      inputProps={{
                        placeholder: "Введите город, район или точный адрес",
                        className: `${classes.formControl}`,
                        id: 'street-address',
                        name: 'address',
                      }}
                      filterFromBound='city'
                      filterToBound='house'
                      token="0e29acdc44dc991a2276e7b9055396891dfe379f"
                      defaultQuery={state.Address.address}
                      value={address}
                      count='5'
                      onChange={setAddress} />
                  }
                  {
                    // ! Кастыль с адресом, что бы рисовался когда его нет
                    !state.Address &&
                    <AddressSuggestions
                      inputProps={{
                        placeholder: "Введите город, район или точный адрес",
                        className: `${classes.formControl}`,
                        id: 'street-address',
                        name: 'address',
                      }}
                      filterFromBound='city'
                      filterToBound='house'
                      token="0e29acdc44dc991a2276e7b9055396891dfe379f"
                      value={address}
                      onChange={setAddress} />
                  }
                </div>
                <div className="px-4 py-3  text-right sm:px-6 col-end-5 col-span-2">
                  <button type='button' className={classes.button} onClick={showMapHandler}>Указать на карте</button>
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Параметры</label>
                  <hr />
                </div>
                <div className="flex col-span-1">
                  <label className="block text-left">
                    <span className="text-gray-700">Присмотрю за</span>
                    <div className="form-check">
                      <input className={classes.checkInput}
                        type="checkbox"
                        id="flexCheckDog"
                        name="dog_flag"
                        checked={state.dog_flag}
                        onChange={onChangeCheckHendler}
                      />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDog">
                        Собакой
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput}
                        type="checkbox"
                        id="flexCheckCat"
                        name="cat_flag"
                        checked={state.cat_flag}
                        onChange={onChangeCheckHendler}
                      />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckCat" >
                        Кошкой
                      </label>
                    </div>
                  </label>
                </div>
                <div className="flex col-span-1">
                  <div>
                    <div className="form-check">
                      <input className={classes.checkInput}
                        type="checkbox"
                        id="flexCheckHasPet"
                        name="has_pet_flag"
                        checked={state.has_pet_flag}
                        onChange={onChangeCheckHendler}
                      />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasPet" >
                        Есть свои питомцы
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput} type="checkbox" id="flexCheckHasChild" name="has_child" checked={state.has_child} onChange={onChangeCheckHendler} />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckHasChild">
                        Есть дети
                      </label>
                    </div>
                    <div className="form-check">
                      <input className={classes.checkInput}
                        type="checkbox"
                        id="flexCheck24"
                        name="supervision_24"
                        checked={state.supervision_24}
                        onChange={onChangeCheckHendler}
                      />
                      <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheck24">
                        Постоянный присмотр
                      </label>
                    </div>
                  </div>
                </div>
                {/* <label className="block text-left col-span-6"> */}
                <div className="flex col-span-1">
                  <div>
                    <label htmlFor="exampleNumber0" className="form-label inline-block mb-2 text-gray-700">Опыт присмотра (лет)</label>
                    <input
                      type="number"
                      className={classes.formControl}
                      id="exampleNumber0"
                      name="experience"
                      value={state.experience}
                      onChange={onChangeHendler}
                    />
                  </div>
                </div>
                <div className="text-left col-span-1">
                  <label className="form-label inline-block mb-2 text-gray-700">Тип жилья для передержки</label>
                  <select className={classes.formControl} name="housing_type" value={state.housing_type} onChange={onChangeHendler}>
                    <option value="" disabled={true} selected={true} hidden={true}>Укажите тип жилья</option>
                    <option value="Квартира">Квартира</option>
                    <option value="Частный дом">Частный дом</option>
                    <option value="Отель для питомцев">Отель для питомцев</option>
                  </select>
                </div>
                <div className="text-left col-span-2">
                  <label className="form-label inline-block mb-2 text-gray-700">Возраст питомца</label>
                  <MultiSelect
                    options={[{ label: 'Щенок (до 1 года)', value: 'Щенок', desc: '(до 1 года)' },
                    { label: 'Взрослый (от 1 года до 7 лет)', value: 'Взрослый', desc: '(от 1 года до 7 лет)' },
                    { label: 'Старый (от 7 лет)', value: 'Старый', desc: '(от 7 лет)' },
                    ]}
                    value={selectedAge}
                    onChange={setSelectedAge}
                    disableSearch={true}
                    overrideStrings={{
                      "allItemsAreSelected": "Выбраны все возрасты",
                      "selectAll": "Выбрать все",
                      "selectAllFiltered": "Выбрать все",
                      "selectSomeItems": "Выберите возраст",
                    }}
                  />
                </div>
                <div className="text-left col-span-2">
                  <label className="form-label inline-block mb-2 text-gray-700">Размер питомца</label>
                  <MultiSelect
                    options={[{ label: 'Маленький (от 1 до 10 кг)', value: 'Маленький', desc: '(от 1 до 10 кг)' },
                    { label: 'Средний (от 10 до 30 кг)', value: 'Средний', desc: '(от 10 до 30 кг)' },
                    { label: 'Большой (от 30 кг)', value: 'Большой', desc: '(от 30 кг)' },
                    ]}
                    value={selectedSize}
                    onChange={setSelectedSize}
                    disableSearch={true}
                    overrideStrings={{
                      "allItemsAreSelected": "Выбраны все размеры",
                      "selectAll": "Выбрать все",
                      "selectAllFiltered": "Выбрать все",
                      "selectSomeItems": "Выберите размеры",
                    }}
                  />
                </div>
                <div className='col-span-2'>
                  <div className="form-check col-span-3">
                    <input className={classes.checkInput}
                      type="checkbox"
                      id="flexCheckStay"
                      name="staying"
                      checked={state.staying}
                      onChange={onChangeCheckHendler}
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckStay">
                      Передержка
                    </label>
                  </div>
                  <br />
                  <div className="mb-3">
                    <label htmlFor="priceDay" className="form-label inline-block mb-2 text-gray-700">Цена за сутки</label>
                    <input
                      type="number"
                      className={classes.formControl}
                      id="priceDay"
                      name="price_per_day"
                      value={state.price_per_day}
                      onChange={onChangeHendler}
                    />
                  </div>
                </div>
                <div className='col-span-2'>
                  <div className="form-check col-span-3">
                    <input className={classes.checkInput}
                      type="checkbox"
                      id="flexCheckWalk" name="walking"
                      checked={state.walking}
                      onChange={onChangeCheckHendler}
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckWalk">
                      Выгул
                    </label>
                  </div>
                  <br />
                  <div className="mb-3">
                    <label htmlFor="priceHour" className="form-label inline-block mb-2 text-gray-700">Цена за час</label>
                    <input
                      type="number"
                      className={classes.formControl}
                      id="priceHour"
                      name="price_per_hour"
                      value={state.price_per_hour}
                      onChange={onChangeHendler}
                    />
                  </div>
                </div>
                <div className='col-span-4 flex items-center'>
                  <DatePicker value={dates}
                    id="schedule"
                    onChange={setDates}
                    multiple={true}
                    numberOfMonths={2}
                    minDate={new Date()}
                    maxDate={new Date().setDate(90)}
                    render={<Icon />}
                    format={"YYYY-MM-DD"}
                    plugins={[
                      <DatePanel />
                    ]} />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="schedule">
                    Настройте свое расписание
                  </label>
                </div>
                <ImagesUpload images={images} setImages={setImages} removedFilesNames={removedFilesNames} setFiles={setFiles} />
              </div>
            </div>
            <div className="px-4 py-3  text-right sm:px-6">
              <button type="submit" className={classes.button}>Сохранить</button>
            </div>
          </div>
        </form >
      </div >
      {
        map.show && <ModalMap map={map} setMap={setMap} setAddress={setAddress} />
      }
    </>
  )
}
