import React from 'react'
import SitterProfileReviewCard from '../SitterProfileReviewCard/SitterProfileReviewCard'

export default function SitterProfileList() {
  return (
    <div className=''>
      <div className=' h-52 bg-slate-400'>Блок с фотками</div>
      <div className=' h-32 bg-slate-600'>Описание</div>
      <div className=' h-32 bg-slate-500'>Детали</div>
      <div className=' h-32 bg-slate-800'>Местоположение</div>
      <div className='  bg-slate-200'>Озывы о ситтере
      <SitterProfileReviewCard/>
      <SitterProfileReviewCard/>
      <SitterProfileReviewCard/>
      </div>
    </div>
  )
}
