import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLS";
import { setLoginData } from "../../store/actions/auth.action";
import classes from './Login.module.css'


export default function Login() {
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function loginHandler(evt) {
    evt.preventDefault();
    console.log({ email });

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
            type="text" className={classes.formControl}
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
            className={classes.formControl}
          />
        </div>

        <button type="submit" className={classes.button}>Войти</button>
      </form>
    </div>
  );
}

