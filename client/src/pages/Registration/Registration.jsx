import React from "react";
import { useDispatch } from "react-redux";
import classes from './Registration.module.css'


import useLocalStorage from "../../hooks/useLS";
import { setRegistr } from "../../store/actions/auth.action";

export default function Registration() {
  const [login, setLogin] = useLocalStorage("login", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [email, setEmail] = useLocalStorage("email", "");


  const dispatch = useDispatch();


  function registrHandler(evt) {
    evt.preventDefault();

    dispatch(setRegistr({ login, password, email }));
    setLogin("");
    setPassword("");
    setEmail("");
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
            type="text" className={classes.formControl}
            placeholder="Имя" />
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
            className={classes.formControl}
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
            className={classes.formControl}
            placeholder="Пароль" />
        </div>

        <button type="submit" className={classes.button}>Зарегистрироваться</button>

      </form>
    </div>

  );
}

