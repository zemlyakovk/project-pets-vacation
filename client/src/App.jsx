import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile/Profile';
import Registration from './pages/Registration';
import SitterCard from './pages/SitterCard';
import SitterProfile from './pages/SitterProfile/SitterProfile';
import 'tw-elements';
import SearchResult from './pages/SearchResult/SearchResult';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='search' element={<SearchResult />} />
          <Route path='users'>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='chat/:id' element={<Chat />} />
            <Route path='profile' element={<Profile />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
          <Route path='sitters'>
            <Route path='profile/new' element={<SitterProfile />} />
            <Route path=':id' element={<SitterCard />} />
            <Route path='profile' element={<SitterProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
