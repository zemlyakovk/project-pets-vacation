import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import SitterCard from './pages/SitterCard';
import SitterProfile from './pages/SitterProfile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='users'>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='chat/:id' element={<Chat />} />
            <Route path=':id' element={<Profile />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
          <Route path='sitters'>
            <Route path='profile/new' element={<SitterProfile />} />
            <Route path=':id' element={<SitterCard />} />
            <Route path='profile/:id' element={<SitterProfile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
