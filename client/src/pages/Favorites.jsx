import React from 'react'
import MiniCardSitter from './MiniCardSitter'
import SearchResult from './SearchResult/SearchResult'



export default function Favorites() {
  return (

    <div className='flex flex-col'>
        <div className=' h-[500px]'>
      <SearchResult />
    </div>
    <div className='flex flex-row'>
   
    
    <div className='grid max-w-4xl'>
      
      <MiniCardSitter />
      <MiniCardSitter />
      <MiniCardSitter />
     
 
    </div>
  
    </div>
    <MiniCardSitter /><MiniCardSitter /><MiniCardSitter />
    </div>
  )
}
