import React, { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import classes from './Profile.module.css';

export default function Profile() {
  const [value, setValue] = useState();

  console.log(value);


  return (
    <div className="mt-10 flex justify-center ">
      <form method="POST" className='w-[70%] mt-10'>
        <div className="shadow overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Имя</label>
                <input type="text" name="first_name" id="first-name" className={classes.formControl} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Фамилия</label>
                <input type="text" name="last_name" id="last-name" className={classes.formControl} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Пол</label>
                <select id="sex" name="sex" className={classes.formControl}>
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Почта</label>
                <input type="text" name="email" id="email-address" className={classes.formControl} />
              </div>

              <div className="col-span-10">
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
              <div className="col-span-10">
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Расскажите о себе</label>
                <textarea name="desc" rows={10} id="desc" className={classes.formControl}></textarea>
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
