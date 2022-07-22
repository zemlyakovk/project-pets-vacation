import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setLogoutData } from '../../store/actions/auth.action';
import classes from './Navbar.module.css'

export default function Navbar() {

  const { auth: { id, profile_photo, Sitter, last_name, sex, Address } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  function logoutHandler(evt) {
    dispatch(setLogoutData());
  }

  function showFalse() {
    setShow(false)
  }

  function check(e) {
    if (!last_name && !sex) {
      setShow(true)
      setTimeout(showFalse, 1500)
      e.preventDefault();
    }
  }


  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${classes.navBar}`}>
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button className={`navbar-toggler ${classes.toggle}`}
          type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
            className="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
            </path>
          </svg>
        </button>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <Link className="text-xl text-black w-1/12" to="/">
            <img className=' w-20'
              src={`${process.env.REACT_APP_STATIC_URL}icons8-animal-shelter-100.png`}
              alt="" />
          </Link>
        </div>

        <div className="flex items-center relative">
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto justify-center items-center">
            {show ?
              <div className="bg-green-100  py-4 px-2 text-base text-green-700 absolute right-14 top-10 rounded-lg" role="alert">
                Необходимо заполнить карточку пользователя
              </div> : <></>}
            <li className="nav-item pr-2" >
              <Link to="sitters/profile/new"
                onClick={check}
                type="button"
                className={classes.becomeSitterBtn}>
                {Sitter?.id ? 'Мой профиль ситтера' : 'Стать ситтером'}
              </Link>
            </li>
            {!id &&
              <>
                <li className="nav-item pr-2">
                  <Link className={classes.link} to="login">Вход</Link>
                </li>
                <li className="nav-item pr-2">
                  <Link className={classes.link} to="registration">Регистрация</Link>
                </li>
              </>
            }
          </ul>
          {id &&
            <div className="dropdown relative ml-2">
              <Link to="/" className="dropdown-toggle flex items-center hidden-arrow" id="dropdownMenuButton2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src={profile_photo
                  ? process.env.REACT_APP_STATIC_URL + profile_photo
                  : process.env.REACT_APP_STATIC_URL + '123.jpeg'} className="rounded-full w-10" alt="Личный кабинет" loading="lazy" />
              </Link>
              <ul className={`dropdown-menu ${classes.dropdowMenu}`} aria-labelledby="dropdownMenuButton2">
                <li>
                  <Link className={classes.linkDrop} to="users/mychats">Сообщения</Link>
                </li>
                <li>
                  <Link className={classes.linkDrop} to="users/favorites">Избранное</Link>
                </li>
                <li>
                  <Link to="users/profile" className={classes.linkDrop}>Личный кабинет</Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutHandler} className={classes.linkDrop}>Выход</Link>
                </li>
              </ul>
            </div>}
        </div>
      </div>
    </nav >
  )
}

