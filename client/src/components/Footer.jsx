import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-gray-200 text-center lg:text-left">
  <div className="text-gray-700 text-center p-4 opacity-50" >
    © 2022 Copyright:
    <Link className="text-gray-800" to="/"> Underdogs team</Link>
  </div>
</div>
  )
}
