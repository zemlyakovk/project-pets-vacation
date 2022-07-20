import React from 'react'
import SitterProfileCard from '../../components/SitterProfileCard/SitterProfileCard'
import SitterProfileList from '../../components/SitterProfileList/SitterProfileList'

export default function SitterDetail() {
  return (
    <div className='flex flex-row justify-center'>
      <SitterProfileCard />
     
      
   
      <SitterProfileList />
      
    </div>
  )
}

