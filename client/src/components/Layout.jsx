//* Основной шаблон
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar/Navbar'

export default function Layout() {
  return (
    <div className='page'>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
