import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Chat from './components/Chat';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile/Profile';
import Registration from './pages/Registration';
import SitterCard from './pages/SitterCard';
import SitterProfile from './pages/SitterProfile/SitterProfile';
import 'tw-elements';
import SearchResult from './pages/SearchResult/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/actions/auth.action';
import { setSitter } from './store/actions/sitter.action';
import SitterDetail from './pages/SitterDetail/SitterDetail';
import CardModalWindow from './components/CardModalWindow/CardModalWindow';




function App() {

  const { auth: { id } } = useSelector((state) => state);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser());
    dispatch(setSitter());
  }, [dispatch, id])


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="registration" element={id ? <Navigate to="/" replace={true} /> : <Registration />} />
          <Route path="login" element={id ? <Navigate to="/" replace={true} /> : <Login />} />
          <Route path='search' element={<SearchResult />} />
          <Route path='users'>
            <Route path='chat' element={<Chat />} />
            <Route path='chat/:id' element={<Chat />} />
            <Route path='profile' element={<Profile />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
          <Route path='sitters'>
            <Route path='profile/new' element={<SitterProfile />} />
            <Route path=':id' element={<SitterCard />} />
            <Route path='profile' element={<SitterDetail />} />
            <Route path='card-modal' element={<CardModalWindow />} />
          </Route>
          <Route path='Allsitters'>
            <Route path=':id' element={<CardModalWindow />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
