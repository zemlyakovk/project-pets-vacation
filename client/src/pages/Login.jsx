import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLS";
import { setLoginData } from "../store/actions/auth.action";


export default function Login() {
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function loginHandler(evt) {
    evt.preventDefault();
    console.log({email});

    dispatch(setLoginData({ email, password }));
    setEmail("");
    setPassword("");
    navigate("/");
  }

  return (
    <div className="formPosition block p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <form onSubmit={loginHandler}>
      <div className="form-group mb-6">
        <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Почта</label>
        <input name="login"
          value={email}
          onChange={evt => {
            setEmail(evt.target.value);
          }}
          id="first_name1"
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
          placeholder="Почта" />
      </div>


      <div className="form-group mb-6">
        <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Пароль</label>
        <input type="password" name="password"
                value={password}
                onChange={evt => {
                  setPassword(evt.target.value);
                }}
                placeholder="Пароль"
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
         />
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
  ease-in-out">Войти</button>
    </form>
  </div>
    );
}

