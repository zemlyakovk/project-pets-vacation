import React, { useEffect, useRef, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios';
import { SET_USER_DATA } from '../../store/types/session.type';
import classes from './Profile.module.css';
import ModalAvatar from '../../components/ModalAvatar/ModalAvatar';
import ModalMap from '../../components/ModalMap/ModalMap';

export default function Profile() {
  const [address, setAddress] = useState();
  const { auth } = useSelector((state) => state);
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const [loading, setLoading] = useState(false);

  const [pic, setPic] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: null,
    new: false
  });

  const [map, setMap] = useState({
    show: false
  });

  useEffect(() => {
    if (auth.id) {
      setState(() => ({ ...auth }))
      setPic((prev) => ({
        ...prev,
        croppedImg: auth.profile_photo
          ? process.env.REACT_APP_STATIC_URL + auth.profile_photo
          : process.env.REACT_APP_STATIC_URL + '123.jpeg'
      }))
    }
  }, [auth])

  function onChangeHendler(event) {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`/users/${state.id}`, { ...state, newAvatar: pic.new ? pic.croppedImg : null });
      setTimeout(() => {
        dispatch({
          type: SET_USER_DATA,
          paylod: state
        })
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error.message);
    }

  }

  function handleFileChange(event) {
    const url = URL.createObjectURL(event.target.files[0]);
    setPic({
      ...pic,
      img: url,
      cropperOpen: true
    });
  }

  function uploadHandler() {
    uploadRef.current.click();
  }

  function showMapHandler() {
    const center = address.value ? [address.data.geo_lat, address.data.geo_lon] : [55.75396, 37.620393];
    setMap((prev) => ({ ...prev, show: true, center, zoom: 10 }))
  }

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

  return (
    <>
      <div className={`mt-10 mb-10 flex justify-center ${loading && classes.loading}`}>
        <form onSubmit={onSubmitHandler} method="POST" className='w-[70%] mt-10'>
          <div className="shadow overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-2">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Имя</label>
                  <input type="text"
                    name="first_name"
                    id="first-name"
                    className={classes.formControl}
                    onChange={onChangeHendler}
                    value={state.first_name}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Фамилия</label>
                  <input type="text"
                    name="last_name"
                    id="last-name"
                    className={classes.formControl}
                    onChange={onChangeHendler}
                    value={state.last_name}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Пол</label>
                  <select id="sex" name="sex" className={classes.formControl} onChange={onChangeHendler} value={state.sex}>
                    <option value="" disabled={true} selected={true} hidden={true}>Укажите пол</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Почта</label>
                  <input type="text"
                    name="email"
                    id="email-address"
                    className={classes.formControl}
                    onChange={onChangeHendler}
                    value={state.email}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Адрес</label>
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
                      onChange={setAddress} />
                  }
                  {
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
                      count='5'
                      onChange={setAddress} />
                  }
                </div>
                <div className="px-4 py-3  text-right sm:px-6 col-end-7 col-span-3">
                  <button type='button' className={classes.button} onClick={showMapHandler}>Указать на карте</button>
                </div>
                <div className="col-span-6">
                  <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Расскажите о себе</label>
                  <textarea name="desc"
                    rows={10}
                    id="desc"
                    className={classes.formControl}
                    value={state.desc}
                    onChange={onChangeHendler}
                  >
                  </textarea>
                </div>
              </div>
            </div>
            <div className="px-4 py-3  text-right sm:px-6">
              <button type="submit" className={classes.button}>Сохранить</button>
            </div>
          </div>
        </form >
        <div className='ml-5'>
          <div>
            <img className="inline-block h-40 w-40 rounded-full ring-2 ring-white" src={pic.croppedImg} alt="" />
          </div>
          <div className='flex justify-center mt-5'>
            <button onClick={uploadHandler} className={`${classes.button}`}>Загрузить фото</button>
          </div>
          <input ref={uploadRef} id="input__file" className='hidden' type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </div >
      {
        pic.cropperOpen && <ModalAvatar pic={pic} setPic={setPic} />
      }
      {
        map.show && <ModalMap map={map} setMap={setMap} setAddress={setAddress} />
      }
    </>
  )
}
