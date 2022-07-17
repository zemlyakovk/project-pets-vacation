import React from 'react'
import SitterProfileCard from '../../components/SitterProfileCard/SitterProfileCard'
import SitterProfileReview from '../../components/SitterProfileReview/SitterProfileReview'

export default function SitterDetail() {
  return (
    <div className='flex flex-row'>
      <div className='w-[310px]'>
      <SitterProfileCard />
      </div>
      <div>
        <SitterProfileReview />
      </div>
    </div>
  )
}

