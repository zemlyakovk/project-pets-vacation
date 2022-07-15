import React, { useEffect, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios';
import { SET_USER_DATA } from '../../store/types/session.type';
import classes from './Profile.module.css';

export default function Profile() {
  const [value, setValue] = useState();
  const { auth } = useSelector((state) => state);
  const [state, setState] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      setState(() => ({ ...auth }))
    }
  }, [auth])

  function onChangeHendler(event) {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      await axios.patch(`/users/${state.id}`, state);
      dispatch({
        type: SET_USER_DATA,
        paylod: state
      })
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className="mt-10 flex justify-center ">
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
                {/* <input type="text" name="street-address" id="street-address" className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" /> */}
                <AddressSuggestions
                  inputProps={{
                    placeholder: "Введите город, район или точный адрес",
                    className: `${classes.formControl}`,
                    id: 'street-address',
                    name: 'address'
                  }}
                  containerClassName=""
                  token="0e29acdc44dc991a2276e7b9055396891dfe379f"
                  value={value}
                  onChange={setValue} />
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
      <div className='self-start ml-5'>
        <img className="inline-block h-40 w-40 rounded-full ring-2 ring-white" src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" alt="" />
      </div>
    </div >
  )
}
