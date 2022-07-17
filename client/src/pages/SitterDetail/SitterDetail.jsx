import React from 'react'
import SitterProfileCard from '../../components/SitterProfileCard/SitterProfileCard'
import SitterProfileReviewCard from '../../components/SitterProfileReviewCard/SitterProfileReviewCard'

export default function SitterDetail() {
  return (
    <div className='flex flex-row'>
      <div className='w-[290px]'>
      <SitterProfileCard />
      </div>
      <div>
        <SitterProfileReviewCard />
      </div>
    </div>
  )
}

