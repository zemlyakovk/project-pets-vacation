//* Основной шаблон
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="formCenter">
        <Outlet />
      </main>
      <footer>
        Footer
      </footer>
    </>
  )
}
