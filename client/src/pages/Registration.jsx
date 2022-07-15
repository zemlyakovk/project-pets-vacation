import React from "react";
import { useDispatch } from "react-redux";


import useLocalStorage from "../hooks/useLS";
import { setRegistr } from "../store/actions/auth.action";

export default function Registration() {
  const [login, setLogin] = useLocalStorage("login", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [email, setEmail] = useLocalStorage("email", "");


  const dispatch = useDispatch();


  function registrHandler(evt) {
    evt.preventDefault();

    dispatch(setRegistr({ login, password, email}));
    setLogin("");
    setPassword("");
    setEmail("");
    // setLast_name("")
    // setPhone("")
    // setAge("")
    // navigate("/");
  }

  return (
    <div className="formPosition block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={registrHandler}>
        <div className="form-group mb-6">
          <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Логин</label>
          <input name="login"
            value={login}
            onChange={evt => {
              setLogin(evt.target.value);
            }}
            id="first_name"
            type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Логин" />
        </div>



        <div className="form-group mb-6">
          <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700">Почта</label>
          <input name="email"
            value={email}
            onChange={evt => {
              setEmail(evt.target.value);
            }}
            id="email"
            type="email"
            className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-describedby="emailHelp" placeholder="Почта" />
          <small id="emailHelp" className="block mt-1 text-xs text-gray-600">Мы никому не покажем ваши личные данные.</small>
        </div>
        <div className="form-group mb-6">
          <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Пароль</label>
          <input type="password" name="password"
            value={password}
            onChange={evt => {
              setPassword(evt.target.value);
            }}
            id="password"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Пароль" />
        </div>

        <button type="submit" className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Зарегистрироваться</button>

      </form>
    </div>

  );
}

