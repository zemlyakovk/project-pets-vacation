//* Основной шаблон
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar/Navbar'

export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header>
        <Navbar />
      </header>
      <main className="grow flex flex-col justify-center bg-[url('http://localhost:3000/images/frame-with-dogs-vector-white-background_53876-127700.webp')]">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div >
  )
}
